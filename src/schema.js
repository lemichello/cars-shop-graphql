const { gql } = require('apollo-server');

const typeDefs = gql`
  type Color {
    id: Int!
    name: String!
  }

  type EngineVolume {
    id: Int!
    volume: Float!
  }

  type Model {
    id: Int!
    name: String!
    vendorId: Int!
  }

  type Vendor {
    id: Int!
    name: String!
    models: [Model]!
  }

  type PriceHistory {
    price: Float!
    date: String!
  }

  type Car {
    id: Int!
    description: String!
    model: Model!
    vendor: Vendor!
    color: Color!
    engineVolume: EngineVolume!
    pricesHistory: [PriceHistory]!
  }

  type Query {
    colors: [Color]!
    engineVolumes: [EngineVolume]!
  }
`;

module.exports = typeDefs;
