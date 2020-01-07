const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
let ColorsDataSource = require('./resources/colorsDataSource');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      colorsSource: new ColorsDataSource()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
