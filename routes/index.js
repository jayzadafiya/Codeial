const express = require("express");
const Router = express.Router();
const homeController  =require("../controllers/home_controller");
const MessageController=require("../controllers/message_controller");

console.log("router loaded");

// similar to app.use we call contorller here
Router.get("/", homeController.home);

// for any further router access from here
Router.use("/users",require("./users"))

Router.use("/posts",require("./posts"));

Router.use("/comments", require("./comments"));

Router.use("/likes",require('./likes'))

Router.use("/api",require("./api"));

Router.get('/api/messages', MessageController.displayMessages);
module.exports = Router;    