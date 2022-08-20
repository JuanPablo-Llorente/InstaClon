// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
const fs = require("fs");
const path = require("path");
// Files
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;
// Models import
const modelsRoute = path.join(__dirname + "/models");
const allModels = fs.readdirSync(modelsRoute);
const models = [];

allModels.forEach(e => {
    const modelRequire = require(path.join(modelsRoute, e));
    models.push(modelRequire);
});


// Sequelize starter
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/instaclon`, {
    logging: false,
});

// Sequelize injection
models.forEach(model => model(sequelize));

// RELATIONS
const {User, Post, Like, Comment, Saved, Following, Follower} = sequelize.models;

// User and Post
User.hasMany(Post);
Post.belongsTo(User);

// User and Like
User.hasMany(Like);
Like.belongsTo(User);

// User and Comment
User.hasMany(Comment);
Comment.belongsTo(User);

// User and Saved
User.hasMany(Saved);
Saved.belongsTo(User);

// User and Following
User.hasMany(Following);
Following.belongsTo(User);

// User and Follower
User.hasMany(Follower);
Follower.belongsTo(User);

// Post and Like
Post.hasMany(Like);
Like.belongsTo(Post);

// Post and Comment
Post.hasMany(Comment);
Comment.belongsTo(Post);

// Post and Saved
Post.hasMany(Saved);
Saved.belongsTo(Post);



module.exports =
{
    ...sequelize.models,
    db: sequelize,
};