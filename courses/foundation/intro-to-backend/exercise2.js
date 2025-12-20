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
  res.sendFile("index.html", { root: "." });
});

//all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const userData = await getAllUsers();
  res.json(userData);
});
//unconfirmed-users should respond with unconfirmed users
app.get("/unconfirmed-users", async (req, res) => {
  const unconfirmedUsersData = await getUnconfirmedUsers();
  res.json(unconfirmedUsersData);
});

//gmail-users should respond with users with an @gmail.com email
app.get("/gmail-users", async (req, res) => {
  const gmailUsersData = await getGmailUsers();
  res.json(gmailUsersData);
});

//2022-users should respond with users created in 2022
app.get("/2022-users", async (req, res) => {
  const earlyCreatedUsers = await getEarlyUsers();
  res.json(earlyCreatedUsers);
});

//user-count should respond with the number of users
app.get("/user-count", async (req, res) => {
  const userCount = await getUserCount();
  res.json(userCount);
});

//last-name-count should respond with how many users there are with a given last name, sorted alphabetically
app.get("/last-name-count", async (req, res) => {
  const lastNameCount = await getLastNameCount();
  res.json(lastNameCount);
});

//first-user should respond with the first user. If there are no users in the table, respond with a 404
app.get("/first-user", async (req, res) => {
  const result = await getFirstUser();
  if (result) res.json(result);
  else res.status(404).send("No users found");
});
//create a new user
app.post("/user", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).send("Missing required fields");
  }
  const user = await createUser(first_name, last_name, email);
  res.status(201).json({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    message: `User created with ID: ${user.id}`,
  });
});

// PATCH method partial modifications to a user
app.patch("/users/:id", async (req, res) => {
 const { id } = req.params;
  const { first_name } = req.body;
  const updatedUserDetails = await updateUser({ id }, first_name);
  if (updatedUserDetails) res.json(updatedUserDetails);
  else res.status(404).send("User not found");
});

//Delete a user by id
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await removeUser({ id });
  if (deletedUser) res.send(`User with ID: ${id} deleted successfully`);
  else res.status(404).send("User not found");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//------------------------------------------------------------------//
const getAllUsers = async () => {
  const users = await knexInstance.raw("select * from users ORDER BY id ASC");
  return users;
};
const getUnconfirmedUsers = async () => {
  const users = await knexInstance.raw("select * from users where confirmed_at IS NULL");
  return users;
}
const getGmailUsers = async () => {
  const users = await knexInstance.raw("select * from users where email LIKE '%@gmail.com'");
  return users;
}
const getEarlyUsers = async () => {
  const usersAt2022 = await knexInstance.raw("select * from users where created_at >= '2022-01-01'  AND created_at <  '2023-01-01';");
  return usersAt2022;
}
const getUserCount = async () => {
  const user_count = await knexInstance.raw("select count(*)as total_users from users");
  return user_count;
}
const getLastNameCount = async () => {
  const last_name_count = await knexInstance.raw("select last_name,count(*) AS last_name_count from users GROUP BY  last_name ORDER BY last_name ASC;");
  return last_name_count;
}
const getFirstUser = async () => {
  const first_user = await knexInstance.raw("select * from users ORDER BY id ASC LIMIT 1");
  return first_user;
}
const createUser = async (first_name, last_name, email) => {
  const [user] = await knexInstance("users")
    .insert({ first_name, last_name, email })
    .returning("*");
  return user;
}
const updateUser = async (id, first_name, last_name, email) => {
  const updatedUserDetails = await knexInstance("users")
    .where({ id })
    .update({ first_name, last_name, email });
  return updatedUserDetails;
}
const removeUser = async (id) => {
  const deletedUser = await knexInstance("users").where({ id }).del();
  return deletedUser;
} 