const express = require("express");
const router = express.Router();
const passport   = require("passport");

const postsController = require("../controllers/posts_controller")
// router.post("/create", postsController.create);

// stop user for make change in code with inspect mode 
router.post("/create",passport.checkAuthentication, postsController.create);

router.get("/destroy/:id",passport.checkAuthentication, postsController.destroy);

module.exports = router;