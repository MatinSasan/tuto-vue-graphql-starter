module.exports = {
  Query: {
    getUsers: async (_, args, { User }) => {
      return await User.find({});
    },
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        });
      return posts;
    }
  },
  Mutation: {
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) throw Error('User already exists');
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return newUser;
    },
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost;
    }
  }
};
