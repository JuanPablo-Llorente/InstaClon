// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Like, Comment} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/user", async (req, res, next) => {
    try
    {
        const foundUser = await User.findAll();
        
        if(foundUser.length)
        {
            res.send(foundUser);
        }
        else
        {
            res.status(404).send("No users created.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

router.get("/user/:id", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundUser = await User.findByPk(id, {
            include: [
                {
                    model: Post,
                },
                {
                    model: Like,
                },
                {
                    model: Comment,
                },
            ],
        })
        // .catch(e => console.error(e));
        
        if(foundUser)
        {
            res.send(foundUser);
        }
        else
        {
            res.status(404).send("User not found.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;