import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET is not defined in environment variables",
      });
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
