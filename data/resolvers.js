
import { Author, Comment } from './connectors';

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    comment(_, args) {
      return Comment.find({ where: args});
    },
    allComments(_, args){
      return Comment.findAll();
    }, 
    allAuthors(_, args){
      return Author.findAll();
    }, 
  },
  Author: {
    posts(author) {
      return author.getPosts();
    },
    comments(author) {
      return author.getComments();
    }
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    comments(post) {
      return post.getComments();
    }
  },
  Comment: {
    author(comment) {
      return comment.getAuthor();
    },
    post(comment){
      return comment.getPost();
    }
  }, 
};

export default resolvers;
