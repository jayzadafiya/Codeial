const express= require('express');
const app = express();
const port  = 8000;
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
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