// in large scale project controller is set of action 
const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
    // //  return res.end("<h1>Epress is up for Codeial</h1>")   
    // return res.render('home',{
    //     title: "Home",
    // })
    try {
        //   const posts =   await Post.find({});
        //populater user for each
        const posts = await Post.find({})
        .sort("-createdAt")
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:"user likes",
            }
        }).populate('likes')
        // .exec();//
        const users = await User.find({})
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log(err);
    }
}