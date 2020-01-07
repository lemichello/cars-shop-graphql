const resolvers = {
  Query: {
    async colors(_, __, { dataSources }) {
      return await dataSources.colorsSource.getColors();
    },
    async engineVolumes(_, __, { dataSources }) {
      return await dataSources.engineVolumesSource.getEngineVolumes();
    }
  }
};

module.exports = resolvers;
