const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function checkOrderStock(items) {
  const shortages = [];
  try {
    const inventory = await fetch(`${API_BASE}/inventory`).then((res) =>
      res.json(),
    );
    items.forEach((item) => {
      const checkStock = inventory.find((t) => t.teaId === item.teaId);
      if (checkStock && checkStock.stockCount < item.grams) {
        shortages.push({
          teaId: item.teaId,
          name: `Tea ID ${item.teaId}`,
          needed: item.grams,
          available:
            checkStock.stockCount < item.grams ? checkStock.stockCount : 0,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 }, // might be out of stock
  { teaId: 3, grams: 9999 }, // definitely out of stock
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});
