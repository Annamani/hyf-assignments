import path from "path";
import { fileURLToPath } from "url";

// recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//console.log("Using DB:", path.resolve(__dirname, "../../dev.sqlite3"));
export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "../../dev.sqlite3"),
    },
    useNullAsDefault: true,

    migrations: {
      directory: path.resolve("./migrate"),
    },

    seeds: {
      directory: path.resolve("./seed"),
    },
  },
};
