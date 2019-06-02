module.exports = {
  VesselState: {
    OPERATIV: '0',
    BEREDSKAP: '1',
    UAD: '3'
  },
  VesselType: {
    FAST_BEMANNET: '0',
    SJOREDNINGSKORPS: '1',
    AMBULANSE: '2'
  },
  Query: {
    vessels: (_, { states, vesselTypes }, { dataSources }) =>
      dataSources.vesselAPI.getVessels({ states, vesselTypes }),
    vessel: (_, { id }, { dataSources }) => dataSources.vesselAPI.getVesselById({ id })
  },
  Vessel: {
    aisData: ({ mmsi }, __, { dataSources }) => {
      return dataSources.aisDataAPI.getAisData({ mmsi }).then(data => {
        console.log(data)
        return data
      })
    }
  }
}
