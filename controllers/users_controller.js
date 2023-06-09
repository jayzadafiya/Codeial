const User = require("../models/user");

module.exports.profile = function (req, res) {

    // return res.end("<h1>User Profile</h1>")
    return res.render('user_profile', {
        title: "user profile",
    })
}

// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codial sign up",
    })
}

// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codial sign in",
    })
}

// get the sign up details
module.exports.create =async function (req, res) {


    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({ email: req.body.email });

        try {

            if (!user) {
                 await User.create(req.body);
                // const newUser = await User.create(req.body);
                // const save = newUser.save();
                // return res.send(save)
                return res.redirect("/users/sign-in");
            }else{
                return res.redirect("back");
            }
        } catch (err) {
            console.log('error in creating user in signing up');
        }

    } catch (err) {
        console.log('error in finding user in signing up');
    }

}

module.exports.createSession = function (req, res) {

}