// Contents of index.js
import express from "express";
import knex from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  const result = await knex.table("users").select("*");
  console.log(result);
  res.send(result);
});

// Rest of the file...
