import knex from "./db.js";
export async function createTables() {
  await knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.timestamp("confirmed_at").nullable();
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();
    t.string("email").notNullable().unique();
    t.string("token").unique();
  });
  await knex.schema.createTable("snippets", (t) => {
    t.increments("id").primary();
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
    t.string("title").notNullable();
    t.text("contents").notNullable();
    t.integer("is_private").notNullable().defaultTo(1);
  });
}
