const { gql } = require('apollo-server')

const typeDefs = gql`
type Query {
  vessels(states: [VesselState], vesselTypes: [VesselType], vesselClasses: [VesselClasses]): [Vessel]
  vessel(id: ID!): Vessel
  stations: [Station]
}

enum VesselState {
  OPERATIV,
  BEREDSKAP,
  UAD
}
enum VesselClasses {
  SKOMVAER,
  ADELER,
  MOB_BAT,
  VON_KOSS,
  EMMY_DYVI,
  SIMRAD,
  FOSEN,
  PETTER_CG_SUNDT,
  BERGESEN,
  ANDRE_FARTOY,
  ULSTEIN,
  STAFF
}

enum VesselType {
  FAST_BEMANNET,
  SJOREDNINGSKORPS,
  AMBULANSE
}

type AisData {
  latitude: String
  longitude: String
  decimalLatitude: Float
  decimalLongitude: Float
  timeStamp: String
  sog: Float
  cog: Float
}

type Vessel {
  merknad: String
  aarsak: String
  forventetTilbake: String
  name: String!
  otherName: String
  id: ID! 
  class: String
  vesselType: String
  callsign: String
  mmsi: String
  mobile: String
  email: String
  port: String
  buildingyardYear: String
  construction: String
  sales: String
  finance: String
  contructionMaterial: String
  dnvClass: String
  speed: String
  range: String
  gross: String
  net: String
  length: String
  beam: String
  draft: String
  bunkerOil: String
  ballastWater: String
  freshWater: String
  bollardPullMaximum: String
  towingHook: String
  mainEngine: String
  auxEngine: String
  gear: String
  controllablePitchPropellars: String
  bowthruster: String
  waterjet: String
  deckMachinery: String
  salvageEquipment: String
  divingEquipment: String
  navigationEquipment: String
  rescueAcommodation: String
  crew: String
  state: Int
  stateDescription: String
  vesselTypeTxt: String
  classTxt: String
  station: Station
  distrikskontor: Distrikskontor
  imageUrl: String
  aisData: AisData
  extendedState: ExtendedState
}

type Station {
  name: String
  type: String
  region: String
  phone: String
  address: String
  zipcode: String
  ziplocation: String
  postalPostbox: String
  postalZipcode: String
  postalZiplocation: String
  emergencyContacts: EmergencyContacts
  coordinateType: String
  latitude: String
  longitude: String
  municipalityWeb: String
  municipalityEmergencyPlan: String
  description: StationDescription
  localTemps: String
  vessels: [Vessel]
}

type Distrikskontor {
  location: String
  address: String
  ziplocartion: String
  phone: String
  shortphone: String
  fax: String
  email: String
  postalPostbox: String
  postalZiplocation: String
  latitude: String
  longitude: String
  xpos: String
  ypos: String
}

type EmergencyContacts {
  police: String
  fire: String
  ambulance: String
  other: String
}

type StationDescription {
  approachSea: String
  approachLand: String
  depths: String
  specialRisks: String
  bunkers: String
  dangerousMaterialsDelivery: String
  otherInformation: String
  communication: String
  mooring: String
  tide: String
  warehouse: String
  insurance: String
  television: String
  powerSupplier: String
  otherPorts: String
  cooperation: String
  deals: String
  recreation: String
}

type ExtendedState {
  statusId: Int
  statusText: String
  colorCode: String
}

`
module.exports = typeDefs
