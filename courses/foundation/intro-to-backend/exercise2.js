import express from "express";
import knex from "knex";

const app = express();
const port = 3000;
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// This connects to the database stored in the file mentioned below
const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "C:\\Users\\annam\\Documents\\Database\\database.sqlite3",
  },
  useNullAsDefault: true, // Omit warning in console
});

app.get("/", (req, res) => {
  //Update the / route to return a HTML page that fetches the count value
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>User Dashboard</title>
      <style>
        body{
          padding: 10px; 
          margin-bottom: 20px;
        }
        h1{
          text-align: center;
        }
        p{
          text-align: center;
        font-size: 20px;
        }
        .dashboard{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        form{
          margin: 5px;
        }
        .view-dashboard{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin: 10px;
        }
        button{
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
          background-color: #f48773ff;
        }
        .create-user{
          display: flex;
          margin-top: 20px;
          text-align: center;
        }
        input{
          padding: 10px;
          margin: 5px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .new-user_input{
          width: 200px;
          display: block;
        }
        .new-user_btn{
          background-color: #4CAF50;
          color: white;
        }
      </style>
    </head>
    <body style="background-color: #f49a9aff;">
    <section class="dashboard">
      <h1>Welcome to the User API Dashboard</h1>
      <p>Use the other endpoints to get user data.</p>
      <p>Current user count: <span id="user-count"></span></p>
      <div class="view-dashboard">
        <form action="/all-users" method="get">
          <button type="submit">View All Users</button>
        </form>
        <form  action="/unconfirmed-users" method="get">
          <button type="submit">View Unconfirmed Users</button>
        </form>   
        <form  action="/gmail-users" method="get">
          <button type="submit">View Gmail Users</button>
        </form>
        <form  action="/2022-users" method="get">
          <button type="submit">View 2022 Users</button>
        </form>
        <form action="/user-count" method="get">
          <button type="submit">User Count</button>
        </form>
        <form  action="/first-user" method="get">
          <button type="submit">First User</button>
        </form>
        <form action="/last-name-count" method="get">
          <button type="submit">Get Last Name Count</button>
        </form>
      </div>
    </section>
    <h2> To create a new user:</h2>
    <section class="create-user">
        <form  action="/new-user" method="post">
          <input class="new-user_input" type="text" name="first_name" placeholder="First Name" required />
          <input class="new-user_input" type="text" name="last_name" placeholder="Last Name" required />
          <input class="new-user_input" type="email" name="email" placeholder="Email" required />
          <button class="new-user_btn" type="submit">Create New User</button>
        </form>
        </section>
    </body>
    <script>
      fetch('/user-count').then(response => response.json())
        .then(data => {
          document.getElementById('user-count').textContent = data[0].total_users;
        });
    </script>
    </html>
  `);
});

//all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("select * from users ORDER BY id ASC");
  res.json(rows);
});
//unconfirmed-users should respond with unconfirmed users
app.get("/unconfirmed-users", async (req, res) => {
  const unconfirmedUsers = await knexInstance.raw(
    "select * from users where confirmed_at is NULL"
  );
  res.json(unconfirmedUsers);
});

//gmail-users should respond with users with an @gmail.com email
app.get("/gmail-users", async (req, res) => {
  const rows = await knexInstance.raw(
    "select * from users where email LIKE '%@gmail.com'"
  );
  res.json(rows);
});

//2022-users should respond with users created in 2022
app.get("/2022-users", async (req, res) => {
  const rows = await knexInstance.raw(
    "select * from users where created_at >= '2022-01-01'  AND created_at <  '2023-01-01';"
  );
  res.json(rows);
});

//user-count should respond with the number of users
app.get("/user-count", async (req, res) => {
  const result = await knexInstance.raw(
    "select count(*)as total_users from users"
  );
  res.json(result);
});

//last-name-count should respond with how many users there are with a given last name, sorted alphabetically
app.get("/last-name-count", async (req, res) => {
  const result = await knexInstance.raw(
    "select last_name,count(*) AS last_name_count from users GROUP BY  last_name ORDER BY last_name ASC;"
  );
  res.json(result);
});

//first-user should respond with the first user. If there are no users in the table, respond with a 404
app.get("/first-user", async (req, res) => {
  const result = await knexInstance.raw(
    "select * from users ORDER BY id ASC LIMIT 1"
  );
  if (result) res.json(result);
  else res.status(404).send("No users found");
});
//create a new user
app.post("/new-user", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).send("Missing required fields");
  }
  const [user] = await knexInstance("users")
    .insert({ first_name, last_name, email })
    .returning("*");

  res.status(201).json({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    message: `User created with ID: ${user.id}`,
  });
});

//

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
