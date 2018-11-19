import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

const CommentModel = db.define('comment', {
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
AuthorModel.hasMany(CommentModel);

PostModel.belongsTo(AuthorModel);
PostModel.hasMany(CommentModel);

CommentModel.belongsTo(AuthorModel);
CommentModel.belongsTo(PostModel);

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true })
  .then(() => {
    _.times(10, async() => {
      return await AuthorModel.create({
        firstName: casual.first_name,
        lastName: casual.last_name,
      }).then(async author => {
        return await author.createPost({
          title: `A post by ${author.firstName}`,
          text: casual.sentences(3),
        });
      });
    });
  })
  .then(() => {
    _.times(10, async () => {
      const autor = await AuthorModel.findAll({
        where: {
          id: _.random(1, 9, false),
        },
      });
      const post = await PostModel.findAll({
        where: {
          id: _.random(1, 9, false),
        },
      });
      return CommentModel.create({
        authorId: _.random(1, 9, false),
        postId: _.random(1, 9, false),
        text: casual.sentences(2),
      });
    });
  });

const Author = db.models.author;
const Post = db.models.post;
const Comment = db.models.comment;

export { Author, Post, Comment };
