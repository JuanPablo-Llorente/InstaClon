// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Like, Comment, Saved} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/post", async (req, res, next) => {
    try
    {
        const foundPosts = await Post.findAll();
        
        if(foundPosts.length)
        {
            res.send(foundPosts);
        }
        else
        {
            res.status(404).send("No posts created.")
        }
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

router.get("/post/:id", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundPost = await Post.findByPk(id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Like,
                },
                {
                    model: Comment,
                },
                {
                    model: Saved,
                },
            ],
        })
        // .catch(e => console.error(e));
        
        if(foundPost)
        {
            const likesCounter = foundPost.Likes ? foundPost.Likes.length : 0;
            const commentsCounter = foundPost.Comments ? foundPost.Comments.length : 0;
            const savedCounter = foundPost.Saveds ? foundPost.Saveds.length : 0;
            
            res.send({foundPost, likesCounter, commentsCounter, savedCounter});
        }
        else
        {
            res.status(404).send("Post not found");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- POST -------------------------------------------------------------------

router.post("/post", async (req, res, next) => {
    const {userId, content, description, location, taggedUsers} = req.body;
    
    try
    {
        const foundUser = await User.findByPk(userId).catch(e => console.error(e));
        
        if(foundUser)
        {
            const newPost = await Post.create({
                content,
                description,
                location,
                taggedUsers,
            });
            
            await foundUser.addPost(newPost);
            
            res.send("Post created successfully.");
        }
        else
        {
            res.status(404).send("Cannot create the post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- PUT -------------------------------------------------------------------

router.put("/post/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId, description, location, taggedUsers} = req.body;
    
    try
    {
        const foundPost = await Post.findByPk(id).catch(e => console.error(e));
        const putVerify = foundPost && foundPost.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(putVerify)
        {
            await Post.update({
                description,
                location,
            },
            {
                where: {id},
            });
            
            res.send("Post updated.");
        }
        else
        {
            res.status(404).send("Cannot update this post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- DELETE -------------------------------------------------------------------

router.delete("/post/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundPost = await Post.findByPk(id).catch(e => console.error(e));
        const deleteVerify = foundPost && foundPost.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(deleteVerify)
        {
            await Post.destroy({
                where: {id},
            });
            
            res.send("Post deleted.");
        }
        else
        {
            res.status(404).send("Cannot delete this post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;