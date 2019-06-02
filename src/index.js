const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const VesselAPI = require('./datasources/vessel-api')
const AisDataAPI = require('./datasources/aisdata-api')
const resolvers = require('./resolvers')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    vesselAPI: new VesselAPI(),
    aisDataAPI: new AisDataAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
