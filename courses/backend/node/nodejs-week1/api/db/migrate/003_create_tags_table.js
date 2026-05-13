export async function up(knex) {
  await knex.schema.createTable("tags", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable().unique();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("tags");
}
