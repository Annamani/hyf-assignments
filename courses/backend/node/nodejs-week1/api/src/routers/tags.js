import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tags = await db("tags").select("*");
    res.json(tags);
  } catch {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});
export default router;
