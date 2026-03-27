const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function searchTeas(query) {
  try {
    const response = await fetch(`${API_BASE}/teas`);
    const teas = await response.json();
    const filterTeas = teas.filter((t) =>
      t.name.toLowerCase().includes(query.toLowerCase()),
    );
    return filterTeas;
  } catch (error) {
    console.log(error.message);
  }
}

// Test it:
searchTeas("pearl").then((teas) => {
  console.log("Search results for 'pearl':");
  teas.forEach((tea) => console.log(`- ${tea.name}`));
});

// Output
// Search results for 'pearl':
// - Jasmine Pearl
// - Royal Kenya Pearl
// - Imperial China Pearl
// - Mountain Sri Lanka Pearl
