const pubsub = require('../pubsub');

const typedef = `
  type Vendor {
    id: Int!
    name: String!
    models: [Model]!
  }

  extend type Query {
    vendorsCount: Int!
    vendors(pagination: PaginationInput): [Vendor]!
  }

  extend type Mutation {
    addVendor(input: NewVendor!): Vendor!
  }

  extend type Subscription {
    vendorAdded: Vendor!
  }
`;

const resolvers = {
  Query: {
    async vendorsCount(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getVendorsCount();
    },
    async vendors(_, { pagination }, { dataSources }) {
      return await dataSources.carsShopAPI.getVendors(pagination);
    }
  },
  Mutation: {
    async addVendor(_, { input }, { dataSources }) {
      let vendor = await dataSources.carsShopAPI.addVendor(input);

      pubsub.publish('vendorAdded', { vendorAdded: vendor });

      return vendor;
    }
  },
  Subscription: {
    vendorAdded: {
      subscribe: () => pubsub.asyncIterator('vendorAdded')
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
