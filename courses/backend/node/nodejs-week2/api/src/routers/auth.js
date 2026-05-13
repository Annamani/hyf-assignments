import express from "express";
import {
  signUp,
  login,
  loginToken,
  logOutToken,
} from "../controllers/authController.js";
import { authMiddleware, authTokenMiddleware } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/login-token", loginToken);
authRouter.get("/profile-token", authTokenMiddleware, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});
authRouter.get("/logout-token", logOutToken);
export default authRouter;
