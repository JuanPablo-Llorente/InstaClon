// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Following, Follower} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/user/:id/following", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundUser = await User.findByPk(id, {
            include:
            {
                model: Following,
            },
        })
        // .catch(e => console.error(e));
        const foundFollowing = foundUser && foundUser.dataValues.Followings.length ? foundUser.dataValues.Followings : null;
        
        if(foundFollowing)
        {
            res.send(foundFollowing);
        }
        else
        {
            res.status(404).send("No followings yet.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- POST -------------------------------------------------------------------

router.post("/user/:id/following", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    console.log(id);
    console.log(userId);
    try
    {
        if(id !== userId)
        {
            const foundFollowing = await User.findByPk(id).catch(e => console.error(e));
            const foundUser = await User.findByPk(userId).catch(e => console.error(e));
            
            if(foundFollowing && foundUser)
            {
                const newFollowing = await Following.create({
                    followingId: id
                });
                const newFollower = await Follower.create({
                    followerId: userId
                });
                
                await foundUser.addFollowing(newFollowing);
                await foundFollowing.addFollower(newFollower);
                
                res.send("Following.");
            }
            else
            {
                res.status(404).send("Cannot follow this user.");
            };
        }
        else
        {
            res.status(404).send("Cannot follow yourself.");
        }
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- DELETE -------------------------------------------------------------------

router.delete("/following/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundFollowing = await Following.findByPk(id).catch(e => console.error(e));
        const deleteVerify = foundFollowing && foundFollowing.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(deleteVerify)
        {
            await Following.destroy({
                where: {id},
            });
            
            await Follower.destroy({
                where: {id},
            });
            
            res.send("Unfollowed.");
        }
        else
        {
            res.status(404).send("Cannot unfollow this user.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;