const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

/* Types */
const { typedef: Color, resolvers: colorResolvers } = require('./types/color');
const {
  typedef: EngineVolume,
  resolvers: engineVolumeResolvers
} = require('./types/engineVolume');
const { typedef: Model, resolvers: modelResolvers } = require('./types/model');
const {
  typedef: Vendor,
  resolvers: vendorResolvers
} = require('./types/vendor');
const { typedef: PriceHistory } = require('./types/priceHistory');
const { typedef: Car, resolvers: carResolvers } = require('./types/car');

/* Inputs */
const { typedef: CarsFilterInput } = require('./inputs/carsFilter');
const { typedef: NewCarInput } = require('./inputs/newCar');
const { typedef: NewColorInput } = require('./inputs/newColor');
const { typedef: NewEngineVolumeInput } = require('./inputs/newEngineVolume');
const { typedef: NewModelInput } = require('./inputs/newModel');
const { typedef: NewVendorInput } = require('./inputs/newVendor');
const { typedef: PaginationInput } = require('./inputs/pagination');
const { typedef: PriceFilterInput } = require('./inputs/priceFilter');

const schema = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

let executableSchema = makeExecutableSchema({
  typeDefs: [
    schema,
    Color,
    Model,
    Vendor,
    PriceHistory,
    Car,
    EngineVolume,
    CarsFilterInput,
    NewCarInput,
    NewColorInput,
    NewEngineVolumeInput,
    NewModelInput,
    NewVendorInput,
    PaginationInput,
    PriceFilterInput
  ],

  resolvers: merge(
    colorResolvers,
    engineVolumeResolvers,
    modelResolvers,
    vendorResolvers,
    carResolvers
  )
});

module.exports = executableSchema;
