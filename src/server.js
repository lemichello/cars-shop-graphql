const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
let ColorsDataSource = require('./resources/colorsDataSource');
let EngineVolumesDataSource = require('./resources/engineVolumesDataSource');
let ModelsDataSource = require('./resources/modelsDataSource');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      colorsSource: new ColorsDataSource(),
      engineVolumesSource: new EngineVolumesDataSource(),
      modelsSource: new ModelsDataSource()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
