const Post = require("../models/post");
const Comment = require("../models/comments");
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create(
            {
                content: req.body.content,
                user: req.user._id,
            }
        )
        //for AJAX 
        //XML https request
        if(req.xhr){
            return res.status(200).send({
                data:{
                    post:post,
                    message:"Post created!!"
                }
            })
        }
        req.flash('success', "Post published!")
        return res.redirect("back");
    } catch (err) {
        req.flash('error', err);
        console.log("error in creating post", err);
        return res.redirect("back");
    }
}

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            // post.remove();
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id:req.params.id,
                    },
                })
                message:"Post delete "
            }
            req.flash('success', "Post and assosiated comments deleted!")

            return res.redirect("back")
        } else {
            req.flash('error', "You can not delete this post")
            return res.redirect("back")
        }
    } catch (err) {
        // console.log("error in deleting post " ,err );
        req.flash('error', err);
        return res.redirect("back")
    }
}