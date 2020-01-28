const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const http = require('http');
var express = require('express');
var cors = require('cors');

/* Data Sources */
let CarsShopAPI = require('./resources/carsShopAPI');

var app = express();

app.use(cors());

const server = new ApolloServer({
  schema: schema,
  dataSources: () => {
    return {
      carsShopAPI: new CarsShopAPI()
    };
  },
  cors: true
});

const PORT = process.env.PORT || 4000;

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(
    `Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
