import { Router } from "express";

import {registerUser, verifyEmail, login, getMe} from "../controllers/auth.contoller.js";
import {registerValidator, loginValidator,} from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerUser);
authRouter.post("/login", loginValidator, login);
authRouter.get("/get-me", authUser, getMe);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
