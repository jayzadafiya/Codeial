const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users_controller");


router.get("/profile/:id",passport.checkAuthentication, usersController.profile);
router.post("/update/:id",passport.checkAuthentication, usersController.update);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post('/create',usersController.create);
//use passport as middleware to authentication
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/sign-out',usersController.destroySession)
// if authenticayion is done them it will call createSession page
// but if it is not done then redirect to sign in page 

//scope is data which we need to fatch
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get("/auth/google/callback",passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);



module.exports = router;    