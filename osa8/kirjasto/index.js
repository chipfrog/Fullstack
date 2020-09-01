require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const url = process.env.MONGODB_URI
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

let authors = []

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = []

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int
    id: ID!
    born: Int
  }

  input AuthorInput {
    name: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: AuthorInput!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre !== undefined) {
        books = await Book.find({ genres: { $elemMatch: { $eq: args.genre } } })
      } 
      else {
        books = await Book.find({})
      }
      return books
    },

    allAuthors: async () => {
      authors = await Author.find({})
      for (a of authors) {
        a.bookCount = (await Book.find({ 'author' : a.id })).length
      }
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const foundAuthor = await Author.findOne({ 'name': args.author.name })

      if (!foundAuthor) {
        const newAuthor = new Author({ name: args.author.name })
        
        try {
          await newAuthor.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const author = await Author.findOne({ 'name': args.author.name })
      const book = new Book({...args, author: author})
      
      try {
        await book.save()
        books.concat(book)
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ 'name' : args.name })
      if (!author) {
        return null
      }
      try {
        author.born = args.born
        await author.save()
        authors = authors.map(a => a.name === args.name ? author : a)
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})