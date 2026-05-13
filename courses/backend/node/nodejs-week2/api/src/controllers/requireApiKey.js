import express from "express";
import knex from "../configs/db.js";
import z from "zod";
import { requireApiKey } from "../middleware/requireKey.js";

export async function getMachineHealth(req, res, next) {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}
