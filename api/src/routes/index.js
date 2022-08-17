// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const users = require("./users");
const register = require("./register");
const post = require("./post");
const like = require("./like");
const comment = require("./comment");
const saved = require("./saved");


const getAll = require("./getAll");


// Routers settings
router.use(users);
router.use(register);
router.use(post);
router.use(like);
router.use(comment);
router.use(saved);

router.use(getAll);


module.exports = router;