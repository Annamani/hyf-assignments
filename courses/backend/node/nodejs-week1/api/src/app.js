import express from "express";
import snippetsRouter from "./routers/snippets.js";
import tagsRouter from "./routers/tags.js";

const app = express();

app.use(express.json());

app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);

export default app;
