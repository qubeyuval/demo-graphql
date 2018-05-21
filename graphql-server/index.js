const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers')

const port = process.env.PORT || 3300

const server = new GraphQLServer({
    typeDefs: './schema/types.graphql',
    resolvers
})

const options = {
    port
}
server.start(options, (options) => console.log(`Server is running on localhost:${port}`))