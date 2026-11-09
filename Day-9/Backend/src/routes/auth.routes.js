const express = require("express");
const authController = require("../controllers/auth.controller")
const authMiddleeware = require("../middleware/auth.middleware")
const authRouter = express.Router()

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)
authRouter.get("/get-me", authMiddleeware.authUser, authController.getMe)
authRouter.get("/logout", authController.logoutUser)


module.exports = authRouter;