const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://zadafiyajay2:RUdmgwRNjQ82lSmX@cluster0.x8finoe.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error",console.error.bind(console ,'Error connecting to MOngoDB') );

db.once('open',()=>{
    console.log('connected to mongoDB');
})

module.exports = db;