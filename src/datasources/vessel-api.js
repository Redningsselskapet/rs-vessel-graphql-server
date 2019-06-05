const { RESTDataSource } = require('apollo-datasource-rest')
const camelCaseKeys = require('camelcase-keys')
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

  getVessels ({ states, vesselTypes, vesselClasses }) {
    return this.getAllVessels()
      .then((vessels) => {
        return this.filterVessels({ vessels, filter: states, key: 'state' })
      })
      .then((vessels) => {
        return this.filterVessels({ vessels, filter: vesselTypes, key: 'vesselType' })
      })
      .then((vessels) => {
        return this.filterVessels({ vessels, filter: vesselClasses, key: 'class' })
        // return vesselClasses ? vessels.filter((vessel) => vesselClasses.includes(vessel.class)) : vessels
      })
  }

  // if filter defined filter vessels array on value(s) in filter and vessels[key]
  filterVessels ({ vessels, filter, key }) {
    return filter ? vessels.filter((vessel) => filter.includes(vessel[key])) : vessels
  }

  vesselReducer ({ vessel }) {
    vessel.id = vessel.rs
    delete vessel.rs
    return cleanDeep(camelCaseKeys(vessel, { deep: true }))
  }

  async getVesselById ({ id }) {
    const vessels = await this.getAllVessels()
    return vessels.find((vessel) => vessel.id === id)
  }
}

module.exports = VesselAPI
