const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
function fetchTeaWithTimeout(id, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeOutId = setTimeout(() => {
      reject(new Error("Timeout Hit"));
    }, timeoutMs);

    fetch(`${API_BASE}/teas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        clearTimeout(timeOutId);
      });
  });
}

// Test with a generous timeout (should work)
fetchTeaWithTimeout(1, 5000)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));

fetchTeaWithTimeout(1, 1)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));
