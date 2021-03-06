import gql from "graphql-tag"

const typeDefs = gql`
  type PartRendezvous {
    country: String
    city: String
    iata: String
    timeLocal: Int
    timeUtc: Int
  }

  type Part {
    type: String
    carrier: String
    operatingCarrier: String
    from: PartRendezvous
    to: PartRendezvous
  }

  type RouteRendezvous {
    country: String
    countryCode: String
    city: String
    iata: String
    timeLocal: Int
    timeUtc: Int
  }

  type Coords {
    lat: Float!
    lon: Float!
  }

  type Interest {
    id: String!
    img: String
    score: Float
    name: String!
    category: String
    address: String
    coords: Coords
    url: String
  }

  type Route {
    from: RouteRendezvous
    to: RouteRendezvous
    parts: [Part]
    interests: [Interest]
  }

  type Item {
    price: Int
    bookingToken: String
    route: [Route]
  }

  type City {
    id: String!
    name: String!
    country: String
  }

  type Location {
    id: String!
    iid: Int
    code: String
    coords: Coords!
    name: String
    slug: String
    timezone: String
    type: String
    city: City
  }

  input Stopover {
    locations: [String]
    nightsFrom: Int
    nightsTo: Int
  }

  input SearchParams {
    adults: Int
    children: Int
    infants: Int
    dateFrom: String!
    dateTo: String!
    returnFrom: String
    returnTo: String
    flyFrom: String!
    flyTo: String
    stopovers: [Stopover!]!
  }

  type Query {
    search(params: SearchParams!): [Item]
    item(bookingToken: String!, interest: String!): Item
    interests(city: String!, country: String, interest: String!): [Interest]
    locations(query: String!, limit: Int): [Location]
  }
`

export default typeDefs
