const pubsub = require('../pubsub');

const typedef = `
  type Color {
    id: Int!
    name: String!
  }

  extend type Query {
    colors: [Color]!
  }

  extend type Mutation {
    addColor(input: NewColorInput!): Color!
  }

  extend type Subscription {
    colorAdded: Color!
  }
`;

const resolvers = {
  Query: {
    async colors(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getColors();
    }
  },
  Mutation: {
    async addColor(_, { input }, { dataSources }) {
      let color = await dataSources.carsShopAPI.addColor(input);

      await pubsub.publish('colorAdded', { colorAdded: color });

      return color;
    }
  },
  Subscription: {
    colorAdded: {
      subscribe: () => pubsub.asyncIterator('colorAdded')
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
