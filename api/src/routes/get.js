// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post} = require("../db");


router.get("/", async (req, res, next) => {
    const users = await User.findAll({
        include:
        {
            model: Post,
        },
    });
    // const posts = await Post.findAll();
    
    
    res.send(users);
});

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    
    const foundUser = await User.findByPk(id, {
        include:
        {
            model: Post,
        },
    })
    .catch(e => console.error(e));
    
    if(foundUser)
    {
        res.send(foundUser);
    }
    else
    {
        res.status(404).send("User not found.");
    };
});


module.exports = router;