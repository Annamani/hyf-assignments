import express from "express";
import {
  getAllUsers,
  getUnconfirmedUsers,
  getGmailUsers,
  getEarlyUsers,
  getUserCount,
  getLastNameCount,
  getFirstUser,
  createUser,
  updateUser,
  removeUser,
} from "./userQuery.js";

const app = express();
const port = 3000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// This connects to the database stored in the file mentioned below

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
app.delete("/deleteusers/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await removeUser({ id });
  if (deletedUser) res.send(`User with ID: ${id} deleted successfully`);
  else res.status(404).send("User not found");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
