const Comment = require("../models/comments");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue=require("../config/kue");
const Like=require("../models/like");

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);
        // if (post) {
        //     const comment = await Comment.create({
        //         content: req.body.content,
        //         post: req.body.post,
        //         user: req.user._id,
        //     });

        //     post.comments.push(comment);
        //     await post.save(); // it will save data as the final version in the database

        //     res.redirect('/');
        // }
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email');
            // commentsMailer.newComment(comment);
            
            let job = queue.create('emails', comment).save(function (err) {
                if (err) { console.log('error in creating queue'); }
                console.log('job enqueued',job.id);
            });

            if (req.xhr) {


                return res.status(200).json({ 
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        req.flash('error', err);
    }
}

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {

            let postID = comment.post;
            await comment.deleteOne();
            const post = await Post.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } })
            
            //destroy the associated likes for this comments
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'})
           
            // send the comment id which was deleted back to the views
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

        }

        req.flash('success', 'Comment deleted!');

        return res.redirect('back');
    } catch (err) {
        console.log("error in deleting comment ", err);
        req.flash('error', err);
        return res.redirect("back");
    }
}