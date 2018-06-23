const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers')

const port = process.env.PORT || 3300

const server = new GraphQLServer({
    typeDefs: './schema/types.graphql',
    resolvers,
})

const options = {
    port,
    endpoint: '/graphql',
    playground: '/playground'
}
server.start(options,
    (options) =>
        console.log(`Server is running on http://localhost:${options.port}/graphql
Use playground on http://localhost:${options.port}/playground`))

