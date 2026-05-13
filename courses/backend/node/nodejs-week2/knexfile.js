import path from "path";
import { fileURLToPath } from "url";

// recreate __dirname
//to avoid path issues that i faced
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "./dev.sqlite3"),
    },
    useNullAsDefault: true,

    migrations: {
      directory: path.resolve("api/src/db/migrate"),
    },

    seeds: {
      directory: path.resolve("api/src/db/seed"),
    },
  },
};
