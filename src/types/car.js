const pubsub = require('../pubsub');

const typedef = `
  type Car {
    id: Int!
    description: String
    model: Model!
    vendor: Vendor!
    color: Color!
    engineVolume: EngineVolume!
    pricesHistory: [PriceHistory]!
    price: Float!
  }

  extend type Query {
    carsCount(filter: CarsFilterInput): Int!
    cars(filter: CarsFilterInput, pagination: PaginationInput): [Car]!
    car(id: Int!): Car
    minMaxPrices: MinMaxPrice!
  }
  
  extend type Mutation {
    addCar(input: NewCar!): Car!
    updateCar(input: NewCar!): Car!
  }
  
  extend type Subscription {
    minMaxPricesChanged: MinMaxPrice!
  }
`;

const resolvers = {
  Query: {
    async carsCount(_, { filter }, { dataSources }) {
      return await dataSources.carsShopAPI.getCarsCount(filter);
    },
    async minMaxPrices(_, __, { dataSources }) {
      const prices = await dataSources.carsShopAPI.getMinMaxPrices();

      return { minPrice: prices[0], maxPrice: prices[1] };
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
    }
  },
  Mutation: {
    async addCar(_, { input }, { dataSources }) {
      let car = await dataSources.carsShopAPI.addCar(input);
      const newMinMaxPrices = await dataSources.carsShopAPI.getMinMaxPrices();

      await pubsub.publish('minMaxPricesChanged', {
        minMaxPricesChanged: {
          minPrice: newMinMaxPrices[0],
          maxPrice: newMinMaxPrices[1]
        }
      });

      return car;
    },
    async updateCar(_, { input }, { dataSources }) {
      let car = await dataSources.carsShopAPI.updateCar(input);
      const newMinMaxPrices = await dataSources.carsShopAPI.getMinMaxPrices();

      await pubsub.publish('minMaxPricesChanged', {
        minMaxPricesChanged: {
          minPrice: newMinMaxPrices[0],
          maxPrice: newMinMaxPrices[1]
        }
      });

      return car;
    }
  },
  Subscription: {
    minMaxPricesChanged: {
      subscribe: () => pubsub.asyncIterator('minMaxPricesChanged')
    }
  },
  Car: {
    price(car) {
      return car.pricesHistory[car.pricesHistory.length - 1].price;
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
