const { GraphQLServer } = require('graphql-yoga');

const port = process.env.PORT || 3300

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.options.port = port;
server.start(() => console.log(`Server is running on localhost:${port}`))