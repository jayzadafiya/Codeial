const User = require("../models/user");

module.exports.profile = async function (req, res) {

    // return res.end("<h1>User Profile</h1>")

    const user = await User.findById(req.params.id);
    return res.render('user_profile', {
        title: "user profile",
        profile_user: user
    });
}

module.exports.update = async function (req, res) {
    try 
    {
        if (req.user.id == req.params.id) {
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect("back");
        }else{
            return res.status(401).send("Unauthorized");
        }
    } catch (err) {
        console.log(err);
    }

}
// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_up', {
        title: "Codial sign up",
    })
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_in', {
        title: "Codial sign in",
    })
}

// get the sign up details
module.exports.create = async function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // User with the same email already exists
            return res.redirect('back');
        }

        await User.create(req.body);
        return res.redirect('/users/sign-in');

    } catch (err) {
        console.log('Error in creating user:', err);
        return res.redirect('back');
    }
}


module.exports.createSession = function (req, res) {
    return res.redirect('/');

}

module.exports.destroySession = function (req, res) {

    req.logout(function (err) {
        if (err) {
            // Handle any potential errors
            console.error(err);
        }
    })
    return res.redirect('/')
}