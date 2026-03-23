const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function countTeas() {
  const response = await fetch(`${API_BASE}/teas`);
  const tea = await response.json();
  console.log(tea.length);
}

countTeas();
