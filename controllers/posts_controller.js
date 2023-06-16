const Post = require("../models/post");
const Comment = require("../models/comments");
module.exports.create = async function (req, res) {
    try {
        await Post.create(
            {
                content: req.body.content,
                user: req.user._id,
            }
        )
        return res.redirect("back");
    } catch (err) {
        console.log("error in creating post", err);
        return
    }
}

module.exports.destroy = async function (req,res){
     try{
        const post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){
            // post.remove();
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({post:req.params.id})
        }
        return res.redirect("back")
     }catch(err){
        console.log("error in deleting comment " ,err );
        return res.redirect("back")
     }
}