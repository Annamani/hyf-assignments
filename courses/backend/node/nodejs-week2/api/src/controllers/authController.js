import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import knex from "../configs/db.js";
import z from "zod";
import crypto from "crypto";
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

//signupSchema
const signUpSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["user", "admin", "moderator"]).optional(),
});
//Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

//Create New user
export async function signUp(req, res, next) {
  try {
    const result = signUpSchema.safeParse(req.body);
    if (!result.success)
      return res.status(400).json({ error: result.error.issues });
    const { first_name, last_name, email, password, role } = result.data;
    const existing = await knex("users").where({ email }).first();
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashed_password = await bcrypt.hash(password, 10);
    const [id] = await knex("users")
      .insert({
        first_name,
        last_name,
        email,
        password_hash: hashed_password,
        role: role || "user",
      })
      .returning(["id", "first_name", "last_name", "email", "role"]);
    res.status(201).json({ id, first_name, last_name, email, role });
  } catch (error) {
    next(error);
  }
}
export async function login(req, res, next) {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.flatten());
    }
    const { email, password } = result.data;
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    next(err);
  }
}
//POST/api/users/login-token
export async function loginToken(req, res, next) {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.flatten());
    }
    const { email, password } = result.data;
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    //Generate a random token
    const randomToken = crypto.randomBytes(32).toString("hex");
    //Store in the tokens table for login user
    await knex("tokens").insert({
      user_id: user.id,
      token: randomToken,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    //Return to client
    return res.status(200).json({
      message: "Login successful",
      token: randomToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//POST/api/users/logout-token
export async function logOutToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authorization header missing",
      });
    }
    const token = authHeader.split(" ")[1];
    // Delete token from database
    const deleted = await knex("tokens").where({ token }).del();
    if (!deleted) {
      return res.status(401).json({
        error: "Invalid token or already logged out",
      });
    }
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

export default router;
