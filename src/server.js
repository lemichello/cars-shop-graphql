const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

/* Data Sources */
let CarsShopAPI = require('./resources/carsShopAPI');

const server = new ApolloServer({
  schema: schema,
  dataSources: () => {
    return {
      carsShopAPI: new CarsShopAPI()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
