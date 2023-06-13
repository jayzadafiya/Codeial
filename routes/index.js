const express = require("express");
const Router = express.Router();
const homeController  =require("../controllers/home_controller");

console.log("router loaded");

// similar to app.use we call contorller here
Router.get("/", homeController.home);

// for any further router access from here
Router.use("/users",require("./users"))

Router.use("/posts",require("./posts"));

module.exports = Router;    