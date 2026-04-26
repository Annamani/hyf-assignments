import knex from "knex";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "./db",
  },
});

export default knexInstance;
