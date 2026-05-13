export async function up(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.string("role").notNullable().defaultTo("user");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("role");
  });
}
