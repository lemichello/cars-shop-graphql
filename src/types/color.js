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
`;

const resolvers = {
  Query: {
    async colors(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getColors();
    }
  },
  Mutation: {
    async addColor(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addColor(input);
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
