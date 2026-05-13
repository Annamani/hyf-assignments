export async function seed(knex) {
  await knex("snippet_tags").del();

  await knex("snippet_tags").insert([
    { snippet_id: 1, tag_id: 5 },
    { snippet_id: 1, tag_id: 4 },
    { snippet_id: 2, tag_id: 3 },
    { snippet_id: 3, tag_id: 1 },
    { snippet_id: 3, tag_id: 4 },
    { snippet_id: 4, tag_id: 4 },
    { snippet_id: 5, tag_id: 2 },
    { snippet_id: 5, tag_id: 4 },
    { snippet_id: 6, tag_id: 4 },
    { snippet_id: 7, tag_id: 4 },
    { snippet_id: 8, tag_id: 1 },
    { snippet_id: 9, tag_id: 1 },
    { snippet_id: 10, tag_id: 4 },
  ]);
}
