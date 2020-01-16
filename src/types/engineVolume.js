const typedef = `
	type EngineVolume {
		id: Int!
		volume: Float!
	}
	
	extend type Query {
		engineVolumes: [EngineVolume]!
	}

	extend type Mutation {
		addEngineVolume(input: NewEngineVolume!): EngineVolume!
	}
`;

const resolvers = {
  Query: {
    async engineVolumes(_, __, { dataSources }) {
      return await dataSources.carsShopAPI.getEngineVolumes();
    }
  },
  Mutation: {
    async addEngineVolume(_, { input }, { dataSources }) {
      return await dataSources.carsShopAPI.addEngineVolume(input);
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
