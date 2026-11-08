const express = require("express");
const userController = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/register",userController.registerUser)
authRouter.post("/login",userController.loginUser)

module.exports = authRouter;