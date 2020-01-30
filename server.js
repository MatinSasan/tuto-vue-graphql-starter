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
    getTodos: [Todo]
  }
`;

// Alternative
//   getTodos: function() {
//     return todos;
//   }

const resolvers = {
  Query: {
    getTodos: () => todos
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

(async function() {
  try {
    const { url } = await server.listen();
    console.log(`server is running at ${url}`);
  } catch (err) {
    console.error(err);
  }
})();
