const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
fetch(`${API_BASE}/teas/3`)
  .then((response) => {
    return response.json();
  })
  .then((teas) => {
    console.log(`${teas.name} from ${teas.origin}`);
  });
