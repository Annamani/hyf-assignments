export async function seed(knex) {
  await knex("snippets").del();

  await knex("snippets").insert([
    {
      user_id: 1,
      title: "Async in Python",
      contents: "A quick guide to using asyncio for concurrent tasks.",
      is_private: 0,
    },
    {
      user_id: 1,
      title: "SQL Basics",
      contents: "An introduction to SELECT, WHERE, and JOIN in SQL.",
      is_private: 1,
    },
    {
      user_id: 2,
      title: "React Hooks",
      contents: "Explaining useState and useEffect with examples.",
      is_private: 0,
    },
    {
      user_id: 2,
      title: "Docker 101",
      contents: "Setting up containers for web apps.",
      is_private: 1,
    },
    {
      user_id: 2,
      title: "Node.js Tips",
      contents: "Best practices for writing clean async code.",
      is_private: 0,
    },
    {
      user_id: 3,
      title: "Rust Ownership",
      contents: "A simple explanation of the ownership model.",
      is_private: 0,
    },
    {
      user_id: 3,
      title: "Linux Commands",
      contents: "Common shell commands for beginners.",
      is_private: 1,
    },
    {
      user_id: 4,
      title: "CSS Grid Layout",
      contents: "How to build responsive layouts with CSS Grid.",
      is_private: 0,
    },
    {
      user_id: 4,
      title: "Tailwind Shortcuts",
      contents: "Useful utility classes for quick design.",
      is_private: 1,
    },
    {
      user_id: 4,
      title: "Flask REST API",
      contents: "Creating a small REST API in Flask.",
      is_private: 0,
    },
  ]);
}
