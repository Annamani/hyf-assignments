import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createSnippet,
  searchSnippets,
  advancedSearch,
  getAllSnippets,
  sortSnippets,
  filterSnippets,
  getPublicSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  getUsers,
  getMySnippets,
  getUserSnippetsById,
} from "../controllers/snippets.js";

const router = express.Router();

// Public endpoints
router.get("/search", searchSnippets);
router.post("/search", advancedSearch);
router.get("/sort", sortSnippets);
router.get("/filter", filterSnippets);
router.get("/public", getPublicSnippets);
router.get("/users", getUsers);
router.get("/users/:id", getUserSnippetsById);
router.get("/", getAllSnippets);
//router.get("/:id", getSnippetById);

//protected endpoints
// create snippet (must be logged in)
router.post("/", authMiddleware, createSnippet);

// my snippets (must be logged in)
router.get("/my-snippets", authMiddleware, getMySnippets);

// update snippet (must be logged in)
router.put("/:id", authMiddleware, updateSnippet);

// delete snippet (must be logged in)
router.delete("/:id", authMiddleware, deleteSnippet);

export default router;
