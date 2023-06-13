// in large scale project controller is set of action 
const Post = require("../models/post");

module.exports.home = async function (req, res) {
    // //  return res.end("<h1>Epress is up for Codeial</h1>")   
    // return res.render('home',{
    //     title: "Home",
    // })
    try {
        //   const posts =   await Post.find({});
        //populater user for each
        const posts = await Post.find({}).populate('user').exec();
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts
        });
    } catch (err) {
        console.log(err);
    }
}