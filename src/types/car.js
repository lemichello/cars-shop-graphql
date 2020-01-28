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
    minMaxPrices: [Float]!
  }
  
  extend type Mutation {
    addCar(input: NewCar!): Car!
    updateCar(input: NewCar!): Car!
  }
`;

const resolvers = {
  Query: {
    async carsCount(_, { filter }, { dataSources }) {
      return await dataSources.carsShopAPI.getCarsCount(filter);
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
    }
  },
  Mutation: {
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

module.exports = {
  typedef,
  resolvers
};
