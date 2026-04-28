import express from "express";
import knex from "../db.js";

const router = express.Router();

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tags = await knex("tags").select("*");
    res.json(tags);
  } catch {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});
///api/tags- POST-Adds a new tag to the database
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing name" });
    }
    const [id] = await knex("tags").insert({ name });
    const tag = await knex("tags").where({ id }).first();
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// /api/tags/:id - GET - Returns a tag by id
router.get("/:id", async (req, res) => {
  try {
    const tagById = await knex("tags").where({ id: req.params.id }).first();
    if (!tagById) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(200).json(tagById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// /api/tags/:id - PUT - Updates the tag by id
router.put("/:id", async (req, res) => {
  try {
    const updatedRows = await knex("tags")
      .where({ id: req.params.id })
      .update(req.body);
    if (!updatedRows) {
      return res.status(404).json({ error: "Tag not found" });
    }
    const updatedTag = await knex("tags").where({ id: req.params.id }).first();
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// /api/tags/:id - DELETE - Deletes the tag by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("tags").where({ id: req.params.id }).del();
    if (!deleted) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(200).json({
      message: "Tag deleted successfully",
      deletedId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
