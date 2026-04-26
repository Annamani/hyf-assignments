import express from "express";
import knex from "./api/db/knex.js";

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Welcome to my page");
});
//GET /api/users
app.get("/users", async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
//GET /api/snippets
app.get("/snippets", async (req, res) => {
  try {
    const snippets = await knex("snippets").select("*");
    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
//GET /api/snippets/:id
app.get("/snippets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const snippet_Id = await knex("snippets").where({ id }).first();
    if (!snippet_Id) {
      return res.status(404).send(`Snippet with id ${id} not found`);
    } else {
      res.json(snippet_Id);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
