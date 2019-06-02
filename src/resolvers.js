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
  VesselClasses: {
    SKOMVAER: '9',
    ADELER: '1',
    MOB_BAT: '0',
    VON_KOSS: '10',
    EMMY_DYVI: '5',
    SIMRAD: '8',
    FOSEN: '6',
    PETTER_CG_SUNDT: '11',
    BERGESEN: '12',
    ANDRE_SRK_FARTOY: '2',
    AMBULANSEBAT: '2',
    ULSTEIN: '15',
    STAFF: '16'
  },
  Query: {
    vessels: (_, { states, vesselTypes, vesselClasses }, { dataSources }) =>
      dataSources.vesselAPI.getVessels({ states, vesselTypes, vesselClasses }),
    vessel: (_, { id }, { dataSources }) => dataSources.vesselAPI.getVesselById({ id })
  },
  Vessel: {
    aisData: ({ mmsi }, __, { dataSources }) => {
      return dataSources.aisDataAPI.getAisData({ mmsi })
    }
  }
}
