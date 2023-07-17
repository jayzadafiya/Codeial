const passport = require('passport');
const passportStratergy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");


//tell passport to use new stratrgy for goole login
passport.use(new googleStrategy({
   
    },
   async function(accessToken,refeshToken,profile,done){
    //    await User.fineOne({emial:profile.emails[0].value}).exac(function(err,user){
        //     if(err){
            //         console.log("error in google stratergy passport",err);
            //     }

    //     console.log(profile);

    //     if(user){
    //         return done (null,user);
    //     }else{
    //          User.create({
    //             name:profile.displayName,
    //             email:profile.emails[0].value,
    //             password:crypto.randomBytes(20).toString('hex'),
    //         },function(err,user){
    //              if (err) {
    //                  console.log("error in creating user google stratergy passport", err);
    //              }
    //              return done (null,user);

    //         })
    //     }
    //    });

       try {
           const user = await User.findOne({ email: profile.emails[0].value }).exec();
           //profile.emails give all emails that user contains
           
           console.log(profile);
           
           if (user) {
            // if user found set it to user as req.user
               return done(null, user);
           } else {
            // if not found,create user and set it to new user or req.user
               const newUser = await User.create({
                   name: profile.displayName,
                   email: profile.emails[0].value,
                   password: crypto.randomBytes(20).toString('hex')
               });

               return done(null, newUser);
           }
       } catch (err) {
           console.log("error in google strategy passport", err);
           return done(err);
       }


    }
))

module.exports = passport;