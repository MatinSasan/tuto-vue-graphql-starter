const { ApolloServer, gql } = require('apollo-server');

const todos = [
  { task: 'Learn fullstack', completed: false },
  { task: 'Practice this tutorial', completed: true }
];

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    _dummy: String
  }
`;

const server = new ApolloServer({
  typeDefs
});

(async function() {
  try {
    const { url } = await server.listen();
    console.log(`server is running at ${url}`);
  } catch (err) {
    console.error(err);
  }
})();
