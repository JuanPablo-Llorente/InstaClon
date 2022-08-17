// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Like} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/like", async (req, res, next) => {
    try
    {
        const foundLike = await Like.findAll();
        
        if(foundLike.length)
        {
            res.send(foundLike);
        }
        else
        {
            res.status(404).send("No likes yet.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

router.get("/like/:id", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundLike = await Like.findByPk(id, {
            include: [
                {
                    model: Post,
                },
                {
                    model: User,
                },
            ],
        })
        // .catch(e => console.error(e));
        
        if(foundLike)
        {
            res.send(foundLike);
        }
        else
        {
            res.status(404).send("Like not found.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

router.get("/post/:id/like", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundPost = await Post.findByPk(id, {
            include:
            {
                model: Like,
            },
        })
        // .catch(e => console.error(e));
        const foundLikes = foundPost && foundPost.dataValues.Likes.length ? foundPost.dataValues.Likes : null;
        
        if(foundLikes)
        {
            res.send(foundLikes);
        }
        else
        {
            res.status(404).send("No likes yet.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- POST -------------------------------------------------------------------

router.post("/post/:id/like", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundPost = await Post.findByPk(id).catch(e => console.error(e));
        const foundUser = await User.findByPk(userId).catch(e => console.error(e));
        
        if(foundPost && foundUser)
        {
            const newLike = await Like.create();
            
            await foundPost.addLike(newLike);
            await foundUser.addLike(newLike);
            
            res.send("Liked.");
        }
        else
        {
            res.status(404).send("Cannot like this post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- DELETE -------------------------------------------------------------------

router.delete("/like/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundLike = await Like.findByPk(id).catch(e => console.error(e));
        const deleteVerify = foundLike && foundLike.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(deleteVerify)
        {
            await Like.destroy({
                where: {id},
            });
            
            res.send("Disliked.");
        }
        else
        {
            res.status(404).send("Cannot dislike this post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;