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
    description: String
    model: Model!
    vendor: Vendor!
    color: Color!
    engineVolume: EngineVolume!
    pricesHistory: [PriceHistory]!
    price: Float!
  }

  input PaginationInput {
    index: Int!
    size: Int!
  }

  input PriceFilterInput {
    fromPrice: Float!
    toPrice: Float!
    selectedDate: String
  }

  input CarsFilterInput {
    modelsId: [Int]!
    colorId: Int
    engineVolumeId: Int
    price: PriceFilterInput
  }

  type Query {
    colors: [Color]!
    engineVolumes: [EngineVolume]!
    modelsCount: Int!
    models(vendorId: Int!, pagination: PaginationInput): [Model]!
    carsCount: Int!
    cars(filter: CarsFilterInput, pagination: PaginationInput): [Car]!
    vendorsCount: Int!
    vendors(pagination: PaginationInput): [Vendor]!
    minMaxPrices: [Float]!
  }

  input NewColorInput {
    name: String!
  }

  input NewEngineVolume {
    volume: Float!
  }

  input NewVendor {
    name: String!
  }

  input NewModel {
    name: String!
    vendorId: Int!
  }

  input NewCar {
    id: Int!
    description: String!
    modelId: Int!
    colorId: Int!
    engineVolumeId: Int!
    price: Float!
  }

  type Mutation {
    addColor(input: NewColorInput!): Boolean
    addEngineVolume(input: NewEngineVolume!): Boolean
    addVendor(input: NewVendor!): Boolean
    addModel(input: NewModel!): Boolean
    addCar(input: NewCar!): Boolean
    updateCar(input: NewCar!): Boolean
  }
`;

module.exports = typeDefs;
