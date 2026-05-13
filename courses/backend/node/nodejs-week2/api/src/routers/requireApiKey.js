import express from "express";
import { getMachineHealth } from "../controllers/requireApiKey.js";
import { requireApiKey } from "../middleware/requireKey.js";

const router = express.Router();
router.get("/health", requireApiKey, getMachineHealth);

export default router;
