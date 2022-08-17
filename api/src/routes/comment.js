// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Like, Comment} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/comment", async (req, res, next) => {
    try
    {
        const foundComment = await Comment.findAll();
        
        if(foundComment.length)
        {
            res.send(foundComment);
        }
        else
        {
            res.status(404).send("No comments yet.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

router.get("/comment/:id", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundComment = await Comment.findByPk(id, {
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
        
        if(foundComment)
        {
            res.send(foundComment);
        }
        else
        {
            res.status(404).send("Comment not found.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

router.get("/post/:id/comment", async (req, res, next) => {
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
        const foundComment = foundPost && foundPost.dataValues.Comment.length ? foundPost.dataValues.Comment : null;
        
        if(foundComment)
        {
            res.send(foundComment);
        }
        else
        {
            res.status(404).send("No comments yet.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- POST -------------------------------------------------------------------

router.post("/post/:id/comment", async (req, res, next) => {
    const {id} = req.params;
    const {userId, content} = req.body;
    
    try
    {
        const foundPost = await Post.findByPk(id).catch(e => console.error(e));
        const foundUser = await User.findByPk(userId).catch(e => console.error(e));
        
        if(foundPost && foundUser)
        {
            const newComment = await Comment.create({content});
            
            await foundPost.addComment(newComment);
            await foundUser.addComment(newComment);
            
            res.send("Commented.");
        }
        else
        {
            res.status(404).send("Cannot comment this post.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- PUT -------------------------------------------------------------------

router.put("/comment/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId, content} = req.body;
    
    try
    {
        const foundComment = await Comment.findByPk(id).catch(e => console.error(e));
        console.log(foundComment);
        const putVerify = foundComment && foundComment.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(putVerify)
        {
            await Comment.update({
                content,
            },
            {
                where: {id},
            });
            
            res.send("Comment updated.");
        }
        else
        {
            res.status(404).send("Cannot update this comment.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- DELETE -------------------------------------------------------------------

router.delete("/comment/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundComment = await Comment.findByPk(id).catch(e => console.error(e));
        const deleteVerify = foundComment && foundComment.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(deleteVerify)
        {
            await Comment.destroy({
                where: {id},
            });
            
            res.send("Comment deleted.");
        }
        else
        {
            res.status(404).send("Cannot delete this comment.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;