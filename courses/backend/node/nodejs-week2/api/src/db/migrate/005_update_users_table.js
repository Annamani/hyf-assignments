import knex from "../../configs/db.js";
export async function up(knex) {
  try {
    // knex.schema.hasColumn(tableName, columnName);
    const isColumnExists = await knex.schema.hasColumn(
      "users",
      "password_hash",
    );
    if (isColumnExists) {
      console.log("Password column already exists");
      return;
    } else {
      await knex.schema.alterTable("users", (t) => {
        t.string("password_hash").notNullable().defaultTo("temp");
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function down(knex) {
  await knex.schema.alterTable("users", (t) => {
    t.dropColumn("password_hash");
  });
}
