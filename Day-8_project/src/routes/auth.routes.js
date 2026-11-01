const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/auth.controller")


// Register a new user
authRouter.post("/register",authController.registerController );

// login a user
authRouter.post("/login",authController.loginController );

module.exports = authRouter;