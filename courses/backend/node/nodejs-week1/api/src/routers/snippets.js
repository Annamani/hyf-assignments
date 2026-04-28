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
///api/snippets-POST-Adds a new snippet to the database
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
///api/snippets/:id-GET-Returns the snippet by id
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
export default router;
