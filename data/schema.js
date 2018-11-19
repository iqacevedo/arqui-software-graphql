import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import mocks from './mocks' <-- comment out
import resolvers from './resolvers';

const typeDefs = `
type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  allComments: [Comment]
  comment(authorId: Int): Comment
  getFortuneCookie: String # we'll use this later
}
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
  comments: [Comment]
}
type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
  comments: [Comment]
}
type Comment {
  id: Int
  text: String
  author: Author
  post: Post
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
