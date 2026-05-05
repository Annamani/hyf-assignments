import express from "express";
import snippetsRouter from "./routers/snippets.js";
import tagsRouter from "./routers/tags.js";

const app = express();

app.use(express.json());

app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);

// Handling 404 Error
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("Error handling request", req.method, req.path, err.message);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
    ...(err.details && { issues: err.details }),
  });
});

export default app;
