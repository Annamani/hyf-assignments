export async function up(knex) {
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

export async function down(knex) {
  await knex.schema.dropTable("snippets");
}
