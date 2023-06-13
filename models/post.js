const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    Timestamps:true,
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;