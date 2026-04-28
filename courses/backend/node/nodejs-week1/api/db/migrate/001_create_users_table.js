export async function up(knex) {
  await knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    t.timestamp("confirmed_at").nullable();
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();
    t.string("email").notNullable().unique();
    t.string("token").unique();
  });
}
//drop if exists
export async function down(knex) {
  await knex.schema.dropTable("users");
}
