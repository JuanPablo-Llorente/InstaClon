// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Saved} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/saved", async (req, res, next) => {
    try
    {
        const foundSaved = await Saved.findAll();
        
        if(foundSaved.length)
        {
            res.send(foundSaved);
        }
        else
        {
            res.status(404).send("No saved posts yet.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

router.get("/saved/:id", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundSaved = await Saved.findByPk(id, {
            include:
            {
                model: Post,
            },
        })
        .catch(e => console.error(e));
        
        if(foundSaved)
        {
            res.send(foundSaved);
        }
        else
        {
            res.status(404).send("Saved post not found.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- POST -------------------------------------------------------------------

router.post("/post/:id/saved", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundPost = await Post.findByPk(id).catch(e => console.error(e));
        const foundUser = await User.findByPk(userId).catch(e => console.error(e));
        
        if(foundPost && foundUser)
        {
            const newSaved = await Saved.create();
            
            await foundPost.addSaved(newSaved);
            await foundUser.addSaved(newSaved);
            
            res.send("Saved.");
        }
        else
        {
            res.status(404).send("Cannot save this post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- DELETE -------------------------------------------------------------------

router.delete("/saved/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundSaved = await Saved.findByPk(id).catch(e => console.error(e));
        const deleteVerify = foundSaved && foundSaved.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(deleteVerify)
        {
            await Saved.destroy({
                where: {id},
            });
            
            res.send("Unsaved.");
        }
        else
        {
            res.status(404).send("Cannot unsave this post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;