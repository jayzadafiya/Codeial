const express= require('express');
const cookieParser =require("cookie-parser");
const app = express();
const port  = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require('./config/mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocal= require("./config/passport-local-strategy") 

app.use(express.urlencoded());

app.use(cookieParser());

// setting up static failes
app.use(express.static("./assets"));

app.use(expressLayouts);

// extract style and script from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setup view engine
app.set('view engine', 'ejs');
app.set("views", "./views");

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,//if user is not login then dont't save , use data 
    resave: false,// id data not change then don't save gain and again 
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//whwnever any resuqst coming it is will check this setaythenticaedUser function 
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err) {
        console.log(err);
    }  
    console.log(`server is running on port ${port}`);

})