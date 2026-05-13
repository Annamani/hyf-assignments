import dotenv from "dotenv";
dotenv.config();
import express from "express";
import snippetsRouter from "./routers/snippets.js";
import tagsRouter from "./routers/tags.js";
import authRouter from "./routers/auth.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import jwt from "jsonwebtoken";
import requireRouter from "./routers/requireApiKey.js";
const swaggerDocument = YAML.load("./api/src/openapi.yml");
const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/auth", authRouter);
app.use("/api", requireRouter);
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
