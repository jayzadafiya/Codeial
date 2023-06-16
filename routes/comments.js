const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controller")
// router.post("/create", postsController.create);

// stop user for make change in code with inspect mode 
router.post("/create", passport.checkAuthentication, commentsController.create);

module.exports = router;