import express from "express";
import fs from "fs";

const app = express();
const textFile = "./myfile.txt";
app.use(express.json());

app.get("/", (request, response) => {
  const fileContent = fs.readFileSync(textFile, "utf-8");
  console.log(fileContent);
  response.send("Hello World");
});
app.get("/query", (request, response) => {
  response.send("Welcome to query page");
});
app.post("/write", (request, respond) => {
  //   console.log("someone is writing");
  //   fs.appendFileSync(textFile, " \nAdding new line for my own file");
  //   respond.send("queryPage");

  // Update the file from info from body-JSON using POSTMAN
  const text = request.body.text;
  const name = request.body.name;
  if (!text) {
    respond.send("not today");
  } else {
    const message = `\n'${name}' said: '${text}'`;
    fs.appendFileSync(textFile, message);
    respond.send("query page");
  }
});

//request.body.text--to get the data from JSON
//request.query--to get the query
//request.params.--to get the parameters in query
app.get("/profile/:id/posts/:postID", (request, response) => {
  response.send(
    `visiting profile of ${request.params.id} for post ${request.params.postID}`,
  );
});
app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("server started running ");
  }
});
