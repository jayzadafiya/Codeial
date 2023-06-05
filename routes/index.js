const express = require("express");
const Router = express.Router();
const homeController  =require("../controllers/homne_controller");

console.log("router loaded");

// similar to app.use we call contorller here
Router.get("/", homeController.home);

module.exports = Router;    