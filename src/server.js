const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
