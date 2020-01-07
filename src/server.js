const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
let ColorsDataSource = require('./resources/colorsDataSource');
let EngineVolumesDataSource = require('./resources/engineVolumesDataSource');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      colorsSource: new ColorsDataSource(),
      engineVolumesSource: new EngineVolumesDataSource()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
