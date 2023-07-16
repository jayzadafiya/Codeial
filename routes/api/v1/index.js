const express = require("express");
const router = express.Router();

router.use('/posts',require("./posts"));
//http://localhost:8000/api/v1/posts
//route index => api index => v1 index => v1 posts =>refer to controllers api v1 posts

module.exports = router;