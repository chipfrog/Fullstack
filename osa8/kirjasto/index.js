require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const url = process.env.MONGODB_URI
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const JWT_KEY = 'SUPER_SECRET_KEY'

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre !== undefined) {
        books = await Book.find({ genres: { $elemMatch: { $eq: args.genre } } }).populate('author')
      } 
      else {
        books = await Book.find({}).populate('author')
      }
      return books
    },

    allAuthors: async () => {
      authors = await Author.find({})
      for (a of authors) {
        a.bookCount = (await Book.find({ 'author' : a.id })).length
      }
      return authors
    },
    me: (root, args, context) => {
      return context.currenUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const foundAuthor = await Author.findOne({ 'name': args.author.name })
      const currentUser = context.currenUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated!")
      }

      if (!foundAuthor) {
        const newAuthor = new Author({ name: args.author.name })
        
        try {
          await newAuthor.save()
          authors.concat(newAuthor)
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
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ 'name' : args.name })
      const currentUser = context.currenUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated!")
      }

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
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      try {
        user.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'salasana') {
        throw new UserInputError('wrong username or password!')
      }
      const userToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userToken, JWT_KEY) }
    }
    
  }
}

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_KEY
      )
      const currenUser = await User.findById(decodedToken.id)
      return { currenUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})