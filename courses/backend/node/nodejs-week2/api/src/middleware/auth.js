import dotenv from "dotenv";
dotenv.config();
import knex from "../configs/db.js";
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
//login-token
export const authTokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authorization header missing or invalid",
      });
    }
    // Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Token missing",
      });
    }
    // Find token in database
    const storedToken = await knex("tokens").where({ token }).first();
    if (!storedToken) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }
    if (
      storedToken.expires_at &&
      new Date(storedToken.expires_at) < new Date()
    ) {
      return res.status(401).json({
        error: "Token expired",
      });
    }
    const user = await knex("users").where({ id: storedToken.user_id }).first();
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          error: "NOT_AUTHENTICATED",
        });
      }

      const allowed = Array.isArray(roles) ? roles : [roles];

      if (!allowed.includes(user.role)) {
        return res.status(403).json({
          error: "FORBIDDEN",
          message: "Insufficient permissions",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
