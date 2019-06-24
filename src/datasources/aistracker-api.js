const { RESTDataSource } = require('apollo-datasource-rest')
const camelCaseKeys = require('camelcase-keys')
const cleanDeep = require('clean-deep')

class AisTrackerApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://aistracker.rs.no/api'
  }
  aisTrackerReducer ({ aisDataTrack }) {
    return aisDataTrack.map(aisData => {
      return cleanDeep(camelCaseKeys(aisData), { deep: true })
    })
  }
  async getAisDataTrack ({ mmsi, startTime, endTime }) {
    const aisDataTrack = await this.get(
      `get_positions/${mmsi}/${startTime}/${endTime}`
    )
    return this.aisTrackerReducer({ aisDataTrack })
  }
}

module.exports = AisTrackerApi
