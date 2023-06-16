const Comment = require("../models/comments");
const Post = require("../models/post");
module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            });

            post.comments.push(comment);
            await post.save(); // it will save data as the final version in the database

            res.redirect('/');
        }
    } catch (err) {
      console.log(err);
    }
}