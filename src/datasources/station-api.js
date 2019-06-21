const { RESTDataSource } = require('apollo-datasource-rest')
const camelCaseKeys = require('camelcase-keys')
const cleanDeep = require('clean-deep')

class StationAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://skoytestasjonapi.rs.no/prefetch'
  }

  async getStations () {
    const response = await this.get('getstations')
    const stations = response.stations
    return Array.isArray(stations)
      ? stations.map(station => this.stationReducer({ station }))
      : []
  }

  stationReducer ({ station }) {
    station = cleanDeep(camelCaseKeys(station))
    station.vessels = []
    if (station.rescueboat && !Array.isArray(station.rescueboat)) {
      station.vessels = [station.rescueboat]
    } else if (Array.isArray(station.rescueboat)) {
      station.vessels = station.rescueboat
    }
    delete station.rescueboat
    station.vessels = station.vessels.map(vessel => {
      vessel.id = vessel.rs
      delete vessel.rs
      return vessel
    })
    return station
  }

  async getStationByVesselId ({ vesselId }) {
    const stations = await this.getStations()
    return stations.find(station =>
      station.vessels.find(vessel => vessel.id === vesselId)
    )
  }
}

module.exports = StationAPI
