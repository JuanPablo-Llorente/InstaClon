// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post} = require("../db");
// const {encrypt} = require("../controllers/bcrypt");
const {ADMIN_PASSWORD} = process.env;


router.post("/post", async (req, res, next) => {
    const {userId, content, description, location} = req.body;
    
    const foundUser = await User.findByPk(userId).catch(e => console.error(e));
    
    
    if(foundUser)
    {
        const newPost = await Post.create({
            content,
            description,
            location,
        });
        
        await foundUser.addPost(newPost);
        
        res.send("Post created successfully.");
    }
    else
    {
        res.status(404).send("User not found.");
    }
});


module.exports = router;