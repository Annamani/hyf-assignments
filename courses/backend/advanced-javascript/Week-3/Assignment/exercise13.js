const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function getWellStockedOrganicTeas() {
  try {
    const teaResponse = await fetch(`${API_BASE}/teas`);
    const tea = await teaResponse.json();
    const filterByOrganic = tea.filter((t) => t.organic === true);
    const inventoryResponse = await fetch(`${API_BASE}/inventory`);
    const inventory = await inventoryResponse.json();
    const result = filterByOrganic
      .map((tea) => {
        const teaData = inventory.find((t) => t.teaId === tea.id);
        return {
          ...tea,
          stock: teaData.stockCount || 0,
        };
      })
      .filter((tea) => tea.stock > 100);

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

getWellStockedOrganicTeas().then((teas) => {
  console.log("Well-stocked organic teas:", teas);
});
