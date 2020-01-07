const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

/* Data Sources */
let ColorsDataSource = require('./resources/colorsDataSource');
let EngineVolumesDataSource = require('./resources/engineVolumesDataSource');
let ModelsDataSource = require('./resources/modelsDataSource');
let CarsDataSource = require('./resources/carsDataSource');
let VendorsDataSource = require('./resources/vendorsDataSource');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      colorsSource: new ColorsDataSource(),
      engineVolumesSource: new EngineVolumesDataSource(),
      modelsSource: new ModelsDataSource(),
      carsSource: new CarsDataSource(),
      vendorsSource: new VendorsDataSource()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
