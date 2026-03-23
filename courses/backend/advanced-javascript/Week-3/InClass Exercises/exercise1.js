const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
fetch(`${API_BASE}/teas`)
  .then((response) => {
    return response.json();
  })
  .then((teas) => {
    console.log(teas.length);
  });
