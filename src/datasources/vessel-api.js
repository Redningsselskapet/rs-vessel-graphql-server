const { RESTDataSource } = require('apollo-datasource-rest')
const camelcaseKeys = require('camelcase-keys')
const cleanDeep = require('clean-deep')

class VesselAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://skoytestasjonapi.rs.no/prefetch'
  }
  async getAllVessels () {
    const response = await this.get('getboats')
    const vessels = response.rescueboats
    return Array.isArray(vessels) ? vessels.map((vessel) => this.vesselReducer({ vessel })) : []
  }

  /* getVessels ({ states }) {
    return this.getAllVessels().then((vessels) => {
      return vessels.filter((vessel) => states.includes(vessel.state))
    })
  } */

  getVessels ({ states, vesselTypes }) {
    return this.getAllVessels().then((vessels) => {
      return this.filterVessels({ vessels, filter: states, key: 'state' })
    }).then(vessels => {
      return this.filterVessels({ vessels, filter: vesselTypes, key: 'vesselType' })
    })
  }

  filterVessels ({ vessels, filter, key }) {
    return Array.isArray(filter) ? vessels.filter((vessel) => filter.includes(vessel[key])) : vessels
  }

  vesselReducer ({ vessel }) {
    vessel.id = vessel.rs
    delete vessel.rs
    return cleanDeep(camelcaseKeys(vessel, { deep: true }))
  }

  async getVesselById ({ id }) {
    const vessels = await this.getAllVessels()
    return vessels.find((vessel) => vessel.id === id)
  }
}

module.exports = VesselAPI
