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


User.hasMany(Post);
Post.belongsTo(User);

// Post.hasMany(Like);
// Like.belongsTo(Post);


module.exports =
{
    ...sequelize.models,
    db: sequelize,
};