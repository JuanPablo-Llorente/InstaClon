// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
// const {encrypt} = require("../controllers/bcrypt");
const {ADMIN_PASSWORD} = process.env;


router.post("/register", async (req, res, next) => {
    const {name, userName, email, phone, password, gender, website, description, birthday, country, profilePhoto} = req.body;
    const definedRole = password === "admin" ? "admin" : "user";
    
    await User.create({
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
        role: definedRole,
    });
    
    res.send("User created successfully.");
    
    // const foundUser = await Profile.findAll({
    //     where:
    //     {
    //         userName: userName,
    //     },
    // });
    // const foundEmail = await Profile.findAll({
    //     where:
    //     {
    //         email: email,
    //     },
    // });
    
    // try
    // {
    //     if(foundUser.length)
    //     {
    //         res.status(404).send("This username isn't available. Please try another.");
    //     }
    //     else if(foundEmail.length)
    //     {
    //         res.status(404).send("This email is already in use available. Please try another.");
    //     }
    //     else
    //     {
    //         if(name, lastName, userName, email, password)
    //         {
    //             const passwordHash = await encrypt(password);
    //             var admin = false;
                
    //             if(password === ADMIN_PASSWORD)
    //             {
    //                 admin = true;
    //             };
                
    //             await Profile.create({
    //                 name,
    //                 lastName,
    //                 userName,
    //                 email,
    //                 password: passwordHash,
    //                 day_of_birth,
    //                 gender,
    //                 img,
    //                 phone,
    //                 public_email,
    //                 description,
    //                 country,
    //                 is_Admin: admin,
    //             });
                
    //             res.send("User created successfully.");
    //         }
    //         else
    //         {
    //             res.status(404).send("All fields are required.");
    //         };
    //     };
    // }
    // catch(error)
    // {
    //     next(error);
    // };
});


module.exports = router;