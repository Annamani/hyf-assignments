import crypto from "crypto";

export async function seed(knex) {
  const users = await knex("users").select("id");

  for (const user of users) {
    await knex("users").where({ id: user.id }).update({
      password_hash: crypto.randomUUID(),
    });
  }
}
