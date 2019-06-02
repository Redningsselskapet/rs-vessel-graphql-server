const { RESTDataSource } = require('apollo-datasource-rest')
const camelcaseKeys = require('camelcase-keys')
const cleanDeep = require('clean-deep')

class AisDataAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://ais.rs.no'
  }
  async getAisData ({ mmsi }) {
    const aisData = await this.get('aktive_pos.json')
    return cleanDeep(camelcaseKeys(aisData, { deep: true })).find(data => data.mmsi === mmsi) || []
  }
}
module.exports = AisDataAPI
