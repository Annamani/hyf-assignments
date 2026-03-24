const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getThreeTeas() {
  const ids = [1, 5, 10];
  try {
    const responses = await Promise.all(
      ids.map((id) => fetch(`${API_BASE}/teas/${id}`)),
    );
    const teas = await Promise.all(responses.map((res) => res.json()));
    teas.forEach((tea) => {
      console.log(tea.name);
    });
  } catch (error) {
    console.error("Error fetching teas:", error.message);
  }
}

getThreeTeas();
