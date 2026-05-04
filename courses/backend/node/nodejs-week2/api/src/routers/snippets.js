import express from "express";
import knex from "../db.js";
import z from "zod";

// snippet schema (POST / PUT)
const snippetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  contents: z.string().min(5, "Contents are required"),
  user_id: z.number().int().positive(),
});

// search query schema
const searchQuerySchema = z.object({
  q: z.string().min(1).optional(),
});

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
    const result = snippetSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        issues: result.error.issues,
      });
    }
    const { title, contents, user_id } = result.data;
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
//Part B: search engine
// GET /search
router.get("/search", async (req, res) => {
  try {
    const result = searchQuerySchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid query",
        issues: result.error.issues,
      });
    }
    const { q } = result.data;
    let query = knex("snippets");
    if (q) {
      query = query
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);
    }

    res.json(await query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// POST /search
const searchBodySchema = z.object({
  fields: z.record(z.string()).optional(),
});

router.post("/search", async (req, res) => {
  try {
    const queryResult = searchQuerySchema.safeParse(req.query);
    const bodyResult = searchBodySchema.safeParse(req.body);

    if (!queryResult.success || !bodyResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        issues: [
          ...(queryResult.success ? [] : queryResult.error.issues),
          ...(bodyResult.success ? [] : bodyResult.error.issues),
        ],
      });
    }

    const { q } = queryResult.data;
    const { fields } = bodyResult.data;

    if (q && fields) {
      return res.status(400).json({
        error: "cant use both q and fields together",
      });
    }

    let query = knex("snippets").select("id", "title", "contents");

    if (q) {
      query = query
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);
    }

    if (fields) {
      Object.entries(fields).forEach(([key, value]) => {
        query = query.where(key, "like", `%${value}%`);
      });
    }

    res.json(await query);
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
    const result = snippetSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        issues: result.error.issues,
      });
    }

    const updatedRows = await knex("snippets")
      .where({ id: req.params.id })
      .update(result.data);

    if (!updatedRows) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    const updatedSnippet = await knex("snippets")
      .where({ id: req.params.id })
      .first();

    res.json(updatedSnippet);
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
