const pubsub = require('../pubsub');

const typedef = `
  type Model {
    id: Int!
    name: String!
    vendorId: Int!
  }

  extend type Query {
    modelsCount(vendorId: Int!): Int!
    models(vendorId: Int!, pagination: PaginationInput): [Model]!
  }

  extend type Mutation {
    addModel(input: NewModel!): Model!
  }

  extend type Subscription {
    modelAdded: Model!
  }
`;

const resolvers = {
  Query: {
    async modelsCount(_, { vendorId }, { dataSources }) {
      return await dataSources.carsShopAPI.getModelsCount(vendorId);
    },
    async models(_, { vendorId, pagination }, { dataSources }) {
      return await dataSources.carsShopAPI.getModels(vendorId, pagination);
    }
  },
  Mutation: {
    async addModel(_, { input }, { dataSources }) {
      let model = await dataSources.carsShopAPI.addModel(input);

      pubsub.publish('modelAdded', { modelAdded: model });

      return model;
    }
  },
  Subscription: {
    modelAdded: {
      subscribe: () => pubsub.asyncIterator('modelAdded')
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
