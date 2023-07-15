const mongoose = require('mongoose');
const multer=require("multer");
const path=require("path");
const AVTAR_PATH=path.join("/uploads/users/avtars");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String,   

    }
}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..",AVTAR_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }

})

//static mathods for set avtar on file and avatar schema 
//single is usetonmakesure that avatar must have single value
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVTAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;