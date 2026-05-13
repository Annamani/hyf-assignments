import express from "express";
import knex from "../configs/db.js";
import z from "zod";
const router = express.Router();
// create schema
const createSchema = z.object({
  name: z.string().min(3),
});
//Define error handler helper
const validationError = (issues) => {
  const err = new Error("Validation failed");
  err.status = 400;
  err.details = issues;
  return err;
};
// GET all tags
router.get("/", async (req, res, next) => {
  try {
    const tags = await knex("tags").select("*");
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

// /api/tags- POST-Adds a new tag to the database
router.post("/", async (req, res, next) => {
  try {
    const result = createSchema.safeParse(req.body);
    if (!result.success) return next(validationError(result.error.issues));
    const { name } = result.data;
    const [id] = await knex("tags").insert({ name });
    const tag = await knex("tags").where({ id }).first();
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
});
// /api/tags/:id - GET - Returns a tag by id
router.get("/:id", async (req, res, next) => {
  try {
    const tagById = await knex("tags").where({ id: req.params.id }).first();
    if (!tagById) {
      const err = new Error("Tag not found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json(tagById);
  } catch (error) {
    next(error);
  }
});
// /api/tags/:id - PUT - Updates the tag by id
router.put("/:id", async (req, res, next) => {
  try {
    const updatedRows = await knex("tags")
      .where({ id: req.params.id })
      .update(req.body);
    if (!updatedRows) {
      const err = new Error("Tag not updated");
      err.status = 404;
      return next(err);
    }
    const updatedTag = await knex("tags").where({ id: req.params.id }).first();
    res.status(200).json(updatedTag);
  } catch (error) {
    next(error);
  }
});
// /api/tags/:id - DELETE - Deletes the tag by id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await knex("tags").where({ id: req.params.id }).del();
    if (!deleted) {
      const err = new Error("Tag not found");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({
      message: "Tag deleted successfully",
      deletedId: req.params.id,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
