import express from "express";
import knex from "knex";

const app = express();
const port = 3000;

// This connects to the database stored in the file mentioned below
const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "C:\\Users\\annam\\Documents\\Database\\database.sqlite3",
  },
  useNullAsDefault: true,  // Omit warning in console
});

app.get("/", (req, res) => {
  res.send("Hello from exercise 2!");
});

//all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});
///unconfirmed-users should respond with unconfirmed users

//gmail-users should respond with users with an @gmail.com email
app.get("/gmail-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users WHERE email LIKE '%@gmail.com'");
  res.json(rows);
});
//2022-users should respond with users created in 2022

//user-count should respond with the number of users
app.get("/user-count", async (req, res) => {
  const result = await knexInstance.raw("select count(*)as total_users from users");
  res.json(result);
});
// last-name-count should respond with how many users there are with a given last name, sorted alphabetically

//first-user should respond with the first user. If there are no users in the table, respond with a 404

//Update the / route to return a HTML page that fetches the count value 
// from the /user-count route you've implemented previously.

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});