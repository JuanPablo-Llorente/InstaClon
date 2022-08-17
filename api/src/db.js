// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
// Files
const modelUser = require("./models/User");
const modelPost = require("./models/Post");
const modelLike = require("./models/Like");
const modelComment = require("./models/Comment");
const modelSaved = require("./models/Saved");
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/instaclon`, {
    logging: false,
});

modelUser(sequelize);
modelPost(sequelize);
modelLike(sequelize);
modelComment(sequelize);
modelSaved(sequelize);

const {User, Post, Like, Comment, Saved} = sequelize.models;


// RELATIONS

// User and Posts
User.hasMany(Post);
Post.belongsTo(User);

// User and Likes
User.hasMany(Like);
Like.belongsTo(User);

// Post and Likes
Post.hasMany(Like);
Like.belongsTo(Post);

// User and Comments
User.hasMany(Comment);
Comment.belongsTo(User);

// Post and Comments
Post.hasMany(Comment);
Comment.belongsTo(Post);



module.exports =
{
    ...sequelize.models,
    db: sequelize,
};