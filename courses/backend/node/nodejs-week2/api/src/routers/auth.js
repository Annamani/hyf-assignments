import express from "express";
import { signUp, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
export default authRouter;
