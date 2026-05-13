import dotenv from "dotenv";
dotenv.config();
import knex from "../configs/db.js";
import jwt from "jsonwebtoken";
const apiKeySecret = process.env.API_KEY;
export const requireApiKey = async (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key");
    if (!apiKey) return res.status(401).json({ error: "API key missing" });
    if (apiKey !== apiKeySecret)
      return res.status(401).json({ error: "Invalid API key" });
    next();
  } catch (error) {
    next(error);
  }
};
