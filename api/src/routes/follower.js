// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Following, Follower} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/user/:id/follower", async (req, res, next) => {
    const {id} = req.params;
    
    try
    {
        const foundUser = await User.findByPk(id, {
            include:
            {
                model: Follower,
            },
        })
        .catch(e => console.error(e));
        const foundFollower = foundUser && foundUser.dataValues.Followers.length ? foundUser.dataValues.Followers : null;
        
        if(foundFollower)
        {
            res.send(foundFollower);
        }
        else
        {
            res.status(404).send("No followers yet.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- DELETE -------------------------------------------------------------------

router.delete("/follower/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundFollower = await Follower.findByPk(id).catch(e => console.error(e));
        const deleteVerify = foundFollower && foundFollower.dataValues.UserId.toString() === userId.toString() ? true : false;
        
        if(deleteVerify)
        {
            await Follower.destroy({
                where: {id},
            });
            
            await Following.destroy({
                where: {id},
            });
            
            res.send("Follower deleted.");
        }
        else
        {
            res.status(404).send("Cannot delete this follower.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;