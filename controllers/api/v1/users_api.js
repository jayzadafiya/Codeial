const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

// authentication done by matching user password email and jwt token
module.exports.createSession =async function (req, res) {
    try{
        let user=await User.findOne({email:req.body.email})

        if(!user||user.password!=req.body.password){
            return res.json(422,
                {
                    message: "Invalid Username or Password",
                })
        }

        return res.json(200,
            {
                message:"Sign in successfull,here is ypur token pleace keep it safe",
                data:{
                    // toJson use to convert user into json 
                    token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'1000000'}),
                }
            })

    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"internal server error"
        });
    }

}