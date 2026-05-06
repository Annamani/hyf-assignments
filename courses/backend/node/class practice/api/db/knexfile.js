export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./api/db/dev.sqlite3",
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./migrate",
    },

    seeds: {
      directory: "./seed",
    },
  },
};
