const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
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

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }
`;

const server = new ApolloServer({
  typeDefs,
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
