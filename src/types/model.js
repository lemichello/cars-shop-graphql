const typedef = `
  type Model {
    id: Int!
    name: String!
    vendorId: Int!
  }

  extend type Query {
    modelsCount: Int!
    models(vendorId: Int!, pagination: PaginationInput): [Model]!
  }

  extend type Mutation {
    addModel(input: NewModel!): Model!
  }
`;

const resolvers = {
  Query: {
    async modelsCount(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getModelsCount();
    },
    async models(_, { vendorId, pagination }, { dataSources }) {
      return await dataSources.carsShopAPI.getModels(vendorId, pagination);
    }
  },
  Mutation: {
    async addModel(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addModel(input);
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
