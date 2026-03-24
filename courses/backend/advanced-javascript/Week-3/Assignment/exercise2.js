const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function getTeaDetails(id) {
  try {
    const [teas, inventory] = await Promise.all([
      fetch(`${API_BASE}/teas/${id}`).then((res) => res.json()),
      fetch(`${API_BASE}/inventory/${id}`).then((res) => res.json()),
    ]);
    return {
      ...teas,
      stock: inventory ? inventory.stockCount : 0,
    };
  } catch (error) {
    console.error("Error fetching teas:", error.message);
  }
}
getTeaDetails(1).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});
