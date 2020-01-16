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
      return await dataSources.carsShopAPI.addVendor(input);
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
