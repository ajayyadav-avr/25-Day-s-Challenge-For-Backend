const express = require("express");
const authController = require("../controllers/auth.controller")

const authRouter = express.Router();

// Register a new user
authRouter.post("/register",authController.registerController );

// login a user
authRouter.post("/login",authController.loginController );

module.exports = authRouter;