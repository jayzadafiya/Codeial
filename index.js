const express= require('express');
const cookieParser =require("cookie-parser");
require('dotenv').config();
const app = express();
const port  = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require('./config/mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocal= require("./config/passport-local-strategy") ;
const passportJwt=require("./config/passport-jwt-strategy");
const passportGoogle=require("./config/passport-google-oauth2-stratergy");
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require("node-sass-middleware");
const flash  = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true,
    outputStyle:"extended",
    prefix:'/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

// setting up static failes
app.use(express.static("./assets"));
// make the upload path available tothe browser
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(expressLayouts);

// extract style and script from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setup view engine
app.set('view engine', 'ejs');
app.set("views", "./views");

// mongo store is user to stroe session cookie in db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,//if user is not login then dont't save , use data 
    resave: false,// id data not change then don't save gain and again 
    cookie: {
        maxAge: (1000 * 60 * 100)
    }, 
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled',
    },
    function(err){
        console.log(err||'connct-mongodb setup ok');
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

//whwnever any resuqst coming it is will check this setaythenticaedUser function 
app.use(passport.setAuthenticatedUser);

//set flash middleware
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err) {
        console.log(err);
    }  
    console.log(`server is running on port ${port}`);

})