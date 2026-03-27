const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function checkOrderStock(items) {
  const shortages = [];
  const response = await fetch(`${API_BASE}/inventory`);
  if (!response.ok) {
    throw new Error("Failed to fetch inventory details");
  }
  const inventory = await response.json();
  items.forEach((item) => {
    const checkStock = inventory.find((t) => t.teaId === item.teaId);
    const available = checkStock ? checkStock.stockCount : 0;
    if (available < item.grams) {
      shortages.push({
        teaId: item.teaId,
        name: `Tea ID ${item.teaId}`,
        needed: item.grams,
        available: checkStock.stockCount,
      });
    }
  });

  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

async function calculateOrderTotal(items, teas) {
  return items.reduce((total, item) => {
    const tea = teas.find((t) => t.id === item.teaId);
    if (!tea) {
      throw new Error(`TeaId ${item.teaId} doesn't exist`);
    }
    return total + item.grams * tea.pricePerGram;
  }, 0);
}

async function processOrder(items) {
  console.log("Processing order...\n");

  // Step 1: Fetch and validate all teas once
  console.log("1. Validating items...");
  const teaResponse = await fetch(`${API_BASE}/teas`);
  if (!teaResponse.ok) {
    throw new Error("Failed to fetch teas");
  }
  const teas = await teaResponse.json();
  const invalidTeaItem = items.find(
    (item) => !teas.some((tea) => tea.id === item.teaId),
  );
  if (invalidTeaItem) {
    throw new Error(`Tea with ID ${invalidTeaItem.teaId} does not exist`);
  }

  // Step 2: Check stock
  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    console.log("Shortages are:");
    stockResult.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
    throw new Error("Items out of stock");
  }

  // Step 3: Calculate total using the already fetched teas
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items, teas);

  // Step 4: Create order summary
  console.log("4. Creating summary...\n");

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

const myOrder = [
  { teaId: 1, grams: 50 },
  { teaId: 5, grams: 100 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });
