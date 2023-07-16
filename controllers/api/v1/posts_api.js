const Post=require("../../../models/post");
const Comment=require("../../../models/comments");
module.exports.index = async function (req, res) {

    //from home controller
    const posts = await Post.find({})
        .sort("-createdAt")
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: "user",
            }
        })
        .exec();

    return res.json(200,
        {
            message: "List of posts",
            posts:posts
        });

}

//from post controllers

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        // if (post.user == req.user.id) {
            // post.remove();
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ post: req.params.id });

          

            return res.json(200,{message: "Post and associated comments delete successfully"});
        // } else {
        //     req.flash('error', "You can not delete this post")
        //     return res.redirect("back")
        // }
    } catch (err) {
        
        returnres.json(500),{message: "internal server error"}
    }
}