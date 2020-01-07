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
    },
    async carsCount(_, __, { dataSources }) {
      return await dataSources.carsSource.getCarsCount();
    },
    async minMaxPrices(_, __, { dataSources }) {
      return await dataSources.carsSource.getMinMaxPrices();
    },
    async cars(_, { filter, pagination }, { dataSources }) {
      if (filter) {
        return await dataSources.carsSource.getFilteredCars(filter, pagination);
      }

      return await dataSources.carsSource.getCars(pagination);
    }
  },
  Mutation: {
    async createColor(_, { input }, { dataSources }) {
      await dataSources.colorsSource.addColor(input);
      return true;
    }
  },
  Car: {
    price(car) {
      return car.pricesHistory[car.pricesHistory.length - 1].price;
    }
  }
};

module.exports = resolvers;
