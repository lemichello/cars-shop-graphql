const resolvers = {
  Query: {
    async colors(_, __, { dataSources }) {
      return await dataSources.colorsSource.getColors();
    }
  }
};

module.exports = resolvers;
