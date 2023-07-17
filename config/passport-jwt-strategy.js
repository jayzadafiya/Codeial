const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const { ExtractJwt } = require("passport-jwt");

// JWT= header.paylod(data).signature(encrypt data )
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eMTY4OTUyNDYyMywiZXhwIjoxNjg5NTI0NjMzfQ.w6uBFbM93lXzNe15gJbN9NJkIZhFHgC7EzCawzX-N54

let opts = {
    //header have set of key in which it have some bearer key set 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "codeial"
}

passport.use(
    new JWTStrategy(opts, async (jwtPayload, done) => {
        try {
            // someone find out key and make fake token sowe are use here id
            //id also can found by someone but if user details including token also is correct but id is not then user is not able to loging 

            const user = await User.findById(jwtPayload._id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);


module.exports = passport;
