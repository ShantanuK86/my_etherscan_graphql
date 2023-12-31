// Import ApolloServer and schema handling functions
const { ApolloServer } = require("apollo-server"); 
const { importSchema } = require("graphql-import");

// Import the data source class 
const EtherDataSource = require("./datasource/ethDatasource");

// Import the GraphQL schema
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables
require("dotenv").config();

// Define resolvers that call data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Pass data source class 
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set timeout and start server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});

