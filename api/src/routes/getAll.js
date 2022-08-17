// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Like, Comment} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/", async (req, res, next) => {
    try
    {
        const Users = await User.findAll();
        const Posts = await Post.findAll();
        const Likes = await Like.findAll();
        const Comments = await Comment.findAll();
        
        res.send({Users, Posts, Likes, Comments});
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;