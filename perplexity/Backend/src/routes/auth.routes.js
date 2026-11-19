import { Router } from "express";

import {registerUser, verifyEmail, loginUser, getMe} from "../controllers/auth.controller.js";
import {registerValidator, loginValidator,} from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerUser);
authRouter.post("/login", loginValidator, loginUser);
authRouter.get("/get-me", authUser, getMe);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
