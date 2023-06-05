const express= require('express');
const app = express();
const port  = 8000;
const expressLayouts = require("express-ejs-layouts");

// setting up static failes
app.use(express.static("./assets"));

app.use(expressLayouts);
// extract style and script from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require("./routes"));

// setup view engine
app.set('view engine', 'ejs');
app.set("views", "./views");


app.listen(port, (err) => {
    if(err) {
        console.log(err);
    }  
    console.log(`server is running on port ${port}`);

})