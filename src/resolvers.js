const resolvers = {
  Query: {
    async colors(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getColors();
    },
    async engineVolumes(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getEngineVolumes();
    },
    async modelsCount(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getModelsCount();
    },
    async models(_, { vendorId, pagination }, { dataSources }) {
      return await dataSources.carsShopAPI.getModels(vendorId, pagination);
    },
    async carsCount(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getCarsCount();
    },
    async minMaxPrices(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getMinMaxPrices();
    },
    async cars(_, { filter, pagination }, { dataSources }) {
      if (filter) {
        return await dataSources.carsShopAPI.getFilteredCars(
          filter,
          pagination
        );
      }

      return await dataSources.carsShopAPI.getCars(pagination);
    },
    async car(_, { id }, { dataSources }) {
      return await dataSources.carsShopAPI.getCarById(id);
    },
    async vendorsCount(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getVendorsCount();
    },
    async vendors(_, { pagination }, { dataSources }) {
      return await dataSources.carsShopAPI.getVendors(pagination);
    }
  },
  Mutation: {
    async addColor(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addColor(input);
    },
    async addEngineVolume(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addEngineVolume(input);
    },
    async addVendor(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addVendor(input);
    },
    async addModel(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addModel(input);
    },
    async addCar(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addCar(input);
    },
    async updateCar(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.updateCar(input);
    }
  },
  Car: {
    price(car) {
      return car.pricesHistory[car.pricesHistory.length - 1].price;
    }
  }
};

module.exports = resolvers;
