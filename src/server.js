const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const dotenv = require('dotenv');
const typeDefs = require('./api/typeDefs');
const resolvers = require('./api/resolvers');
const { connectDatabase } = require('./db');

dotenv.config();

const app = express();
app.use(express.json());

// Apollo Server with the GraphQL
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server
async function startServer() {
  await server.start();

  // graphqL and pg connection
  app.use('/graphql', expressMiddleware(server));
  await connectDatabase();  

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => { // server
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
});