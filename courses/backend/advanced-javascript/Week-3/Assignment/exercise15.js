const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function getFullInventoryReport() {
  // Fetch both endpoints in parallel
  try {
    const [teas, inventory] = await Promise.all([
      fetch(`${API_BASE}/teas`).then((res) => res.json()),
      fetch(`${API_BASE}/inventory`).then((res) => res.json()),
    ]);
    const report = teas.map((tea) => {
      const teaStock = inventory.find((item) => item.teaId === tea.id);
      return {
        name: tea.name,
        origin: tea.origin,
        stock: teaStock ? teaStock.stockCount : 0,
      };
    });

    return report;
  } catch (error) {
    console.error("Error fetching teas:", error.message);
  }
}
getFullInventoryReport().then((report) => {
  console.log("Inventory Report:");
  report.forEach((item) => {
    console.log(`- ${item.name} (${item.origin}): ${item.stock} in stock`);
  });
});
