const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

require('dotenv').config({ path: './variables.env' });

const User = require('./models/User');
const Post = require('./models/Post');

(async function() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('DB connected');
  } catch (err) {
    console.error(err);
  }
})();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

(async function() {
  try {
    const { url } = await server.listen();
    console.log(`server is running at ${url}`);
  } catch (err) {
    console.error(err);
  }
})();
