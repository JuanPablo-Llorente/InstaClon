// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Post, Like, Comment, Saved, Following, Follower} = require("../db");


//---------------------------------------------------------------- GET -------------------------------------------------------------------

router.get("/user", async (req, res, next) => {
    const {userName} = req.query;
    
    try
    {
        if(userName)
        {
            const foundUser = await User.findOne({
                where:
                {
                    userName,
                },
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
                    {
                        model: Saved,
                    },
                    {
                        model: Following,
                    },
                    {
                        model: Follower,
                    },
                ],
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
        }
        else
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
                {
                    model: Saved,
                },
                {
                    model: Following,
                },
                {
                    model: Follower,
                },
            ],
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
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- PUT -------------------------------------------------------------------

router.put("/user/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    const {name, userName, email, phone, password, gender, website, description, birthday, country, profilePhoto} = req.body;
    
    try
    {
        const foundUser = await User.findByPk(id).catch(e => console.error(e));
        const putVerify = foundUser && foundUser.dataValues.id.toString() === userId.toString() ? true : false;
        
        if(putVerify)
        {
            await User.update({
                name,
                userName,
                email,
                phone,
                password,
                gender,
                website,
                description,
                birthday,
                country,
                profilePhoto,
            },
            {
                where: {id},
            });
            
            res.send("User updated.");
        }
        else
        {
            res.status(404).send("Cannot update this user.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});

//---------------------------------------------------------------- DELETE -------------------------------------------------------------------

router.delete("/user/:id", async (req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    
    try
    {
        const foundUser = await User.findByPk(id).catch(e => console.error(e));
        const deleteVerify = foundUser && foundUser.dataValues.id.toString() === userId.toString() ? true : false;
        
        if(deleteVerify)
        {
            await User.destroy({
                where: {id},
            });
            
            res.send("User deleted.");
        }
        else
        {
            res.status(404).send("Cannot delete this user.");
        };
    }
    catch(error)
    {
        console.error(error);
        next();
    };
});


module.exports = router;