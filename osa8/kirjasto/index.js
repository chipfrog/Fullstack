require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const url = process.env.MONGODB_URI

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const book = require('./models/book')
const author = require('./models/author')

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
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
      // if (args.author !== undefined && args.genre !== undefined) {
      //   return books.filter(book => (book.author === args.author) && (book.genres.includes(args.genre)))
      // }
      // else if (args.author !== undefined && args.genre === undefined) {
      //   return books.filter(book => book.author === args.author)
      // }
      // else if (args.author === undefined && args.genre !== undefined) {
      //   return books.filter(book => book.genres.includes(args.genre))
      // }
      const fecthedBooks = await Book.find({})

      for (b of fecthedBooks) {
        console.log(b.author)
      }

      return Book.find({})
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
        console.log(newAuthor)
        await newAuthor.save()
      }
      const author = await Author.findOne({ 'name': args.author.name })
      const book = new Book({...args, author: author})
      
      try {
        await book.save()
        books.concat(book)
      } catch(error) {
        console.log(error.message)
      }
      console.log(book.author.name)
      return book
      // console.log(args.author)
      // if (!authors.find(author => author.name === args.author)) {
      //   const author = {
      //     name: args.author,
      //     id: uuid()
      //   }
      //   authors = authors.concat(author)
      // }
      // const book = { ...args, id: uuid() }
      // books = books.concat(book)
      // return book
    },
    editAuthor: (root, args) => {
      console.log(args)
      const author = authors.find(a => a.name === args.name)
      console.log(author)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.born }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
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