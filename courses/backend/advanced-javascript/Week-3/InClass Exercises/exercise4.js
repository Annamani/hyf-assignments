const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
fetch(`${API_BASE}/inventory`)
  .then((response) => {
    return response.json();
  })
  .then((inventory) => {
    console.log("Low stock:");
    inventory.filter((tea) => {
      if (tea.stockCount < 50)
        console.log(`- ${tea.teaName} : ${tea.stockCount}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
