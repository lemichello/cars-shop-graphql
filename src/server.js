const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

/* Data Sources */
let CarsShopAPI = require('./resources/carsShopAPI');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      carsShopAPI: new CarsShopAPI()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
