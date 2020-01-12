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
      await dataSources.carsShopAPI.addColor(input);
      return true;
    },
    async addEngineVolume(_, { input }, { dataSources }) {
      await dataSources.carsShopAPI.addEngineVolume(input);
      return true;
    },
    async addVendor(_, { input }, { dataSources }) {
      await dataSources.carsShopAPI.addVendor(input);
      return true;
    },
    async addModel(_, { input }, { dataSources }) {
      await dataSources.carsShopAPI.addModel(input);
      return true;
    },
    async addCar(_, { input }, { dataSources }) {
      await dataSources.carsShopAPI.addCar(input);
      return true;
    },
    async updateCar(_, { input }, { dataSources }) {
      await dataSources.carsShopAPI.updateCar(input);
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
