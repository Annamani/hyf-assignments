export async function seed(knex) {
  await knex("snippet_tags").del();
  await knex("tags").del();

  await knex("tags").insert([
    { id: 1, name: "javascript" },
    { id: 2, name: "node" },
    { id: 3, name: "sql" },
    { id: 4, name: "backend" },
    { id: 5, name: "python" },
  ]);
}
