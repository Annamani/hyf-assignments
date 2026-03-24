const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function calculateOrderTotal(items) {
  try {
    const teas = await fetch(`${API_BASE}/teas`).then((res) => res.json());
    return items.reduce((total, item) => {
      const tea = teas.find((t) => t.id === item.teaId);
      if (!tea) {
        throw new Error(`TeaId ${item.teaId} doesn't exist`);
      }
      return total + item.grams * tea.pricePerGram;
    }, 0);
  } catch (error) {
    console.log(error.message);
  }
}
const order = [
  { teaId: 1, grams: 100 },
  { teaId: 3, grams: 50 },
  { teaId: 8, grams: 200 },
];

calculateOrderTotal(order)
  .then((total) => console.log(`Order total: ${total.toFixed(2)} DKK`))
  .catch((err) => console.error("Error:", err.message));
