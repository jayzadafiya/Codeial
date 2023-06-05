module.exports.profile = function(req,res){

    // return res.end("<h1>User Profile</h1>")
    return res.render('user', {
        title: "user profile",
    })
}