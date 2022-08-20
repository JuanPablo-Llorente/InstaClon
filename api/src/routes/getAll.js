// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Like, Comment, Saved, Following, Follower} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/", async (req, res, next) => {
    try
    {
        const Users = await User.findAll();
        const Posts = await Post.findAll();
        const Likes = await Like.findAll();
        const Comments = await Comment.findAll();
        const Saveds = await Saved.findAll();
        const Followings = await Following.findAll();
        const Followers = await Follower.findAll();
        
        res.send({Users, Posts, Likes, Comments, Saveds, Followings, Followers});
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;