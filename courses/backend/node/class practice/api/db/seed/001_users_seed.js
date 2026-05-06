export async function seed(knex) {
  await knex("snippets").del();
  await knex("users").del();

  await knex("users").insert([
    {
      first_name: "Aiko",
      last_name: "Tanaka",
      email: "aiko.tanaka@example.com",
      token: "tok123",
      confirmed_at: "2025-01-12 10:30:00",
    },
    {
      first_name: "Mateo",
      last_name: "García",
      email: "mateo.garcia@example.com",
      token: "mad456",
      confirmed_at: "2025-02-18 14:22:00",
    },
    {
      first_name: "Liam",
      last_name: "O'Connor",
      email: "liam.oconnor@example.com",
      token: "dub789",
      confirmed_at: "2025-03-09 09:45:00",
    },
    {
      first_name: "Fatima",
      last_name: "Al-Sayed",
      email: "fatima.alsayed@example.com",
      token: "cai321",
      confirmed_at: "2025-04-01 16:15:00",
    },
    {
      first_name: "Zanele",
      last_name: "Khumalo",
      email: "zanele.khumalo@example.com",
      token: "jhb654",
      confirmed_at: null,
    },
  ]);
}
