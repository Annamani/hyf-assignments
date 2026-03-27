const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function getTeaWithStock(id) {
  try {
    const teaResponse = await fetch(`${API_BASE}/teas/${id}`);
    const tea = await teaResponse.json();
    const inventoryResponse = await fetch(`${API_BASE}/inventory`);
    const inventory = await inventoryResponse.json();
    const teaData = inventory.find((t) => t.teaId === tea.id);
    console.log(
      `TeaName: ${teaData.teaName} stockCount:  ${teaData.stockCount}`,
    );
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

getTeaWithStock(1);
getTeaWithStock(999);
