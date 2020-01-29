const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const VesselAPI = require('./datasources/vessel-api')
const AisDataAPI = require('./datasources/aisdata-api')
const StationAPI = require('./datasources/station-api')
const AisTrackerApi = require('./datasources/aistracker-api')
const resolvers = require('./resolvers')
const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  dataSources: () => ({
    vesselAPI: new VesselAPI(),
    aisDataAPI: new AisDataAPI(),
    stationAPI: new StationAPI(),
    aisTrackerApi: new AisTrackerApi()
  })
})

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
