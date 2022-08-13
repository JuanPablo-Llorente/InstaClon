// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const register = require("./register");
const post = require("./post");
const get = require("./get");


// Routers settings
router.use(register);
router.use(post);
router.use(get);


module.exports = router;