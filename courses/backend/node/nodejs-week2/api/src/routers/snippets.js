import express from "express";
import knex from "../db.js";
import z from "zod";

const router = express.Router();
// snippet schema (POST / PUT)
const snippetSchema = z.object({
  title: z.string().min(1),
  contents: z.string().min(10),
  user_id: z.number().int().positive(),
});

// search query schema
const searchQuerySchema = z.object({
  q: z.string().min(1).optional(),
});

//sort query schema
const sortQuerySchema = z.object({
  sort: z
    .string()
    .trim()
    .transform((val) => {
      const [column, direction = "asc"] = val.split(" ");
      return {
        column,
        direction: direction.toLowerCase(),
      };
    })
    .refine(
      ({ column, direction }) =>
        ["title", "created_at"].includes(column) &&
        ["asc", "desc"].includes(direction),
      {
        message: "Invalid sort. Use: title asc | created_at desc",
      },
    )
    .optional(),
});
// tag schema
const tagQuerySchema = z.object({
  tag: z.string().min(1),
});
// search body sce
const searchBodySchema = z.object({
  fields: z.record(z.string()).optional(),
});

//Define error handler helper
const validationError = (issues) => {
  const err = new Error("Validation failed");
  err.status = 400;
  err.details = issues;
  return err;
};
// /api/snippets-POST-Adds a new snippet to the database
router.post("/", async (req, res, next) => {
  try {
    const result = snippetSchema.safeParse(req.body);
    if (!result.success) return next(validationError(result.error.issues));
    const { title, contents, user_id } = result.data;
    const [id] = await knex("snippets").insert({
      title,
      contents,
      user_id,
    });
    const snippet = await knex("snippets").where({ id }).first();
    res.status(201).json(snippet);
  } catch (error) {
    next(error);
  }
});
//Part B: search engine
// GET /search
router.get("/search", async (req, res, next) => {
  try {
    const result = searchQuerySchema.safeParse(req.query);
    if (!result.success) return next(validationError(result.error.issues));
    const { q } = result.data;
    let query = knex("snippets");
    if (q) {
      query = query
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);
    }

    res.json(await query);
  } catch (error) {
    next(error);
  }
});
// POST /search
router.post("/search", async (req, res, next) => {
  try {
    const queryResult = searchQuerySchema.safeParse(req.query);
    const bodyResult = searchBodySchema.safeParse(req.body);

    if (!queryResult.success || !bodyResult.success) {
      return next(
        validationError([
          ...(queryResult.success ? [] : queryResult.error.issues),
          ...(bodyResult.success ? [] : bodyResult.error.issues),
        ]),
      );
    }
    const { q } = queryResult.data;
    const { fields } = bodyResult.data;
    if (q && fields) {
      const err = new Error("cant use both q and fields together");
      err.status = 404;
      return next(err);
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
    next(error);
  }
});

// WEEK-2 Assignment
// It leads to SQL injection
router.get("/", async (req, res, next) => {
  try {
    let query = knex.select("*").from("snippets");
    if ("sort" in req.query) {
      const orderBy = req.query.sort.toString();
      if (orderBy.length > 0) {
        query = query.orderByRaw(orderBy); // Vulnerable!
      }
    }
    //console.log("SQL", query.toSQL().sql);
    res.json(await query);
  } catch (error) {
    next(error);
  }
});
//Fix the vulnerability:
router.get("/sort", async (req, res, next) => {
  try {
    const result = sortQuerySchema.safeParse(req.query);
    if (!result.success) return next(validationError(result.error.issues));
    let query = knex("snippets").select("*");

    if (result.data.sort) {
      const { column, direction } = result.data.sort;
      query = query.orderBy(column, direction);
    }
    //console.log("SAFE SQL:", query.toSQL().sql);
    res.json(await query);
  } catch (error) {
    next(error);
  }
});
//GET /api/snippets?tag=javascript.
router.get("/filter", async (req, res, next) => {
  try {
    const result = tagQuerySchema.safeParse(req.query);
    if (!result.success) return next(validationError(result.error.issues));
    const { tag } = result.data;
    const snippets = await knex("snippets")
      .select("*")
      .where("title", "like", `%${tag}%`);
    return res.status(200).json({
      status: "success",
      data: snippets,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/public", async (req, res, next) => {
  try {
    const snippets = await knex("snippets")
      .select("*")
      .where("is_private", false)
      .orderBy("created_at", "desc");
    return res.status(200).json({
      status: "success",
      data: snippets,
    });
  } catch (error) {
    next(error);
  }
});
// /api/snippets/:id-GET-Returns the snippet by id
router.get("/:id", async (req, res, next) => {
  try {
    const snippetById = await knex("snippets")
      .where({ id: req.params.id })
      .first();
    if (!snippetById) {
      const err = new Error("Snippet not found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json(snippetById);
  } catch (error) {
    next(error);
  }
});
// /api/snippets/:id- PUT- Updates the snippet by id
router.put("/:id", async (req, res, next) => {
  try {
    const result = snippetSchema.partial().safeParse(req.body);
    if (!result.success) return next(validationError(result.error.issues));
    const updatedRows = await knex("snippets")
      .where({ id: req.params.id })
      .update(result.data);

    if (!updatedRows) {
      const err = new Error("Snippet not found");
      err.status = 404;
      return next(err);
    }
    const updatedSnippet = await knex("snippets")
      .where({ id: req.params.id })
      .first();
    res.json(updatedSnippet);
  } catch (error) {
    next(error);
  }
});
///api/snippets/:id - DELETE -Deletes the snippet by id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await knex("snippets").where({ id: req.params.id }).del();
    if (!deleted) {
      const err = new Error("Snippet not found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({
      message: "Snippet deleted successfully",
      deletedId: req.params.id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
