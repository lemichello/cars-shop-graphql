const resolvers = {
  Query: {
    async colors(_, __, { dataSources }) {
      return await dataSources.colorsSource.getColors();
    },
    async engineVolumes(_, __, { dataSources }) {
      return await dataSources.engineVolumesSource.getEngineVolumes();
    },
    async modelsCount(_, __, { dataSources }) {
      return await dataSources.modelsSource.getModelsCount();
    },
    async models(_, { vendorId, pagination }, { dataSources }) {
      return await dataSources.modelsSource.getModels(vendorId, pagination);
    }
  }
};

module.exports = resolvers;
