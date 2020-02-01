const pubsub = require('../pubsub');

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
  
  extend type Subscription {
    engineVolumeAdded: EngineVolume!
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
      let engineVolume = await dataSources.carsShopAPI.addEngineVolume(input);

      await pubsub.publish('engineVolumeAdded', {
        engineVolumeAdded: engineVolume
      });

      return engineVolume;
    }
  },
  Subscription: {
    engineVolumeAdded: {
      subscribe: () => pubsub.asyncIterator('engineVolumeAdded')
    }
  }
};

module.exports = {
  typedef,
  resolvers
};
