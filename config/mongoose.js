const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://zadafiyajay2:0OhYeW4f1kAW9uMV@cluster0.x8finoe.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error",console.error.bind(console ,'Error connecting to MOngoDB') );

db.once('open',()=>{
    console.log('connected to mongoDB');
})

module.exports = db;
