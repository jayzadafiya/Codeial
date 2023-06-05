const express = require("express");
const Router = express.Router();
const userController = require("../controllers/users_controller");


Router.get("/profile", userController.profile);

module.exports = Router;    