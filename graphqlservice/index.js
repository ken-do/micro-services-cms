const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const ServiceResolver = require('../sharedLibs/ServiceResolver')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        serviceResolver: new ServiceResolver(),
    },
})

server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`)
})
