export async function up(knex) {
  await knex.schema.createTable("tokens", (t) => {
    t.increments("id").primary();
    t.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    t.string("token").notNullable().unique();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("expires_at").nullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("tokens");
}
