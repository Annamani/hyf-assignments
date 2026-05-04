import knex from "knex";
import config from "../../db/knex-file.js";
const environment = process.env.NODE_ENV || "development";
const knexInstance = knex(config[environment]);
export default knexInstance;
