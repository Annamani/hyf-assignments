import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from exercise 1!");
});

app.get("/currentYear", (req, res) => {
  const curentYear = new Date().getFullYear();
  res.send("Current year is : " + curentYear);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});