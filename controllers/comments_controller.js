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

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {

            let postID = comment.post;
            await comment.deleteOne();
            const post = await Post.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } })
        }
        return res.redirect("back");
    } catch (err) {
        console.log("error in deleting comment " ,err );
        return res.redirect("back");
    }
}