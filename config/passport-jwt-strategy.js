const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const { ExtractJwt } = require("passport-jwt");

// JWT= header+paylod(data)+signature(encrypt data )

let opts = {
    //header have set of key in which it have some bearer key set 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: "codeial"
}

passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

    // someone find out key and make fake token sowe are use here id
    //id also can found by someone but if user details including token also is correct but id is not then user is not able to loging 
    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) {
            console.log('error in finding jwt token');
            return;
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })

}));

module.exports = passport;
