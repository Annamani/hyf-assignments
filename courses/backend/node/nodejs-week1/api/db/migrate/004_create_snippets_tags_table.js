export async function up(knex) {
  await knex.schema.createTable("snippet_tags", (t) => {
    t.integer("snippet_id")
      .notNullable()
      .references("id")
      .inTable("snippets")
      .onDelete("CASCADE");

    t.integer("tag_id")
      .notNullable()
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");

    t.primary(["snippet_id", "tag_id"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("snippet_tags");
}
