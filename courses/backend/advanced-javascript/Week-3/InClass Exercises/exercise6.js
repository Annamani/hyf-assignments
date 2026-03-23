const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
fetch(`${API_BASE}/teas`)
  .then((response) => response.json())
  .then((teas) => {
    const teaData = teas.filter((t) => t.origin === "Japan");
    teaData.forEach((tea) => {
      console.log(`${tea.name}  ${tea.pricePerGram}`);
    });
  })
  .catch((error) => console.error(error));
