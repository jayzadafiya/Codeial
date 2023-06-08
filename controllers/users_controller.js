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
module.exports.create = function (req, res) {

}

module.exports.createSession = function (req, res) {

}