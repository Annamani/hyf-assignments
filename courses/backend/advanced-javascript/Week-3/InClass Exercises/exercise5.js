const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
fetch(`${API_BASE}/teas/1`)
  .then((response) => response.json())
  .then((tea) => {
    console.log("Tea:", tea.name);
    return fetch(`${API_BASE}/inventory`)
      .then((response) => response.json())
      .then((inventory) => {
        return { tea, inventory };
      });
  })
  .then(({ tea, inventory }) => {
    const teaData = inventory.find((t) => t.teaId === tea.id);
    console.log(teaData.stockCount);
  })
  .catch((error) => console.error("Error:", error.message));
