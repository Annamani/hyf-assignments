import express from "express";
import knex from "../db.js";

const router = express.Router();

// GET all snippets
router.get("/", async (req, res) => {
  try {
    const snippets = await knex("snippets").select("*");
    console.log("SNIPPETS:", snippets);
    res.json(snippets);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// /api/snippets-POST-Adds a new snippet to the database
router.post("/", async (req, res) => {
  try {
    const { title, contents, user_id } = req.body;
    if (!title || !contents || !user_id) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const [id] = await knex("snippets").insert({
      title,
      contents,
      user_id,
    });
    const snippet = await knex("snippets").where({ id }).first();
    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// /api/snippets/:id-GET-Returns the snippet by id
router.get("/:id", async (req, res) => {
  try {
    const snippetById = await knex("snippets")
      .where({ id: req.params.id })
      .first();
    if (!snippetById) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.status(200).json(snippetById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// /api/snippets/:id- PUT- Updates the snippet by id
router.put("/:id", async (req, res) => {
  try {
    const updatedRows = await knex("snippets")
      .where({ id: req.params.id })
      .update(req.body);
    if (!updatedRows) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    const updatedSnippet = await knex("snippets")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(updatedSnippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
///api/snippets/:id - DELETE -Deletes the snippet by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("snippets").where({ id: req.params.id }).del();
    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.status(200).json({
      message: "Snippet deleted successfully",
      deletedId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
