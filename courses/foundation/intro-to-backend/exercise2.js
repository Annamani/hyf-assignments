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
  //Update the / route to return a HTML page that fetches the count value 
  res.send(`
    <h1>Welcome to the User API</h1>
    <p>Use the other endpoints to get user data.</p>
    <p>Current user count: <span id="user-count"></span></p>
    <script>
      fetch('/user-count')
        .then(response => response.json())
        .then(data => {
          document.getElementById('user-count').textContent = data[0].total_users;
        });
    </script>
  `);
});

//all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("select * from users ORDER BY id ASC");
  res.json(rows);
});
//unconfirmed-users should respond with unconfirmed users
app.get("/unconfirmed-users", async (req, res) => {
  const unconfirmedUsers = await knexInstance.raw("select * from users where confirmed_at is NULL");
  res.json(unconfirmedUsers);
});

//gmail-users should respond with users with an @gmail.com email
app.get("/gmail-users", async (req, res) => {
  const rows = await knexInstance.raw("select * from users where email LIKE '%@gmail.com'");
  res.json(rows);
});

//2022-users should respond with users created in 2022
app.get("/2022-users", async (req, res) => {
  const rows = await knexInstance.raw("select * from users where created_at >= '2022-01-01'  AND created_at <  '2023-01-01';");
  res.json(rows);
});

//user-count should respond with the number of users
app.get("/user-count", async (req, res) => {
  const result = await knexInstance.raw("select count(*)as total_users from users");
  res.json(result);
});

//last-name-count should respond with how many users there are with a given last name, sorted alphabetically
app.get("/last-name-count", async (req, res) => {
  const result = await knexInstance.raw("select last_name,count(*) AS last_name_count from users GROUP BY  last_name ORDER BY last_name ASC;");
  res.json(result);
});

//first-user should respond with the first user. If there are no users in the table, respond with a 404
app.get("/first-user", async (req, res) => {
  const result = await knexInstance.raw("select * from users ORDER BY id ASC LIMIT 1");
  if (result)
    res.json(result);
  else
    res.status(404).send("No users found");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});