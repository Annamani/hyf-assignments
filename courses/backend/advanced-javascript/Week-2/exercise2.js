import { teas as data } from "../data/teas.js";
import fs from "fs";
// Exercise 2: Order Processing System ⭐
const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};
//validateOrder(order, callback);
function validateOrder(order, callback) {
  setTimeout(() => {
    const errors = [];
    order.items.forEach((item) => {
      const exists = data.some((tea) => tea.id === item.teaId);
      if (!exists) {
        errors.push(`Tea with id ${item.teaId} does not exist`);
      }
    });
    const validateOrderResult = {
      valid: errors.length,
      errors: errors,
    };
    callback(validateOrderResult);
  }, 200);
}
// calculateTotal(order, callback);
function calculateTotal(order, callback) {
  setTimeout(() => {
    let totalPrice = 0;
    order.items.forEach((item) => {
      const tea = data.find((tea) => tea.id === item.teaId);
      if (tea) {
        totalPrice += tea.pricePerGram * item.grams;
      }
    });
    const calculateTotalResult = {
      orderId: order.id,
      total: totalPrice,
    };

    callback(calculateTotalResult);
  }, 300);
}
function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = [];
    let inStock = true;
    order.items.forEach((item) => {
      const tea = data.find((t) => t.id === item.teaId);
      if (!tea) {
        shortages.push(`Tea ID ${item.teaId} not found in inventory`);
        inStock = false;
      } else if (!tea.inStock) {
        shortages.push(`${tea.name} is out of stock`);
        inStock = false;
      } else if (tea.stockCount < item.grams) {
        shortages.push(
          `${tea.name} - Requested ${item.grams} grams, but only ${tea.stockCount} grams in stock`,
        );
        inStock = false;
      }
    });
    const checkStockResult = {
      orderId: order.id,
      inStock: inStock,
      shortages: shortages,
    };
    callback(checkStockResult);
  }, 400);
}
validateOrder(order, (result) => {
  console.log("validateOrder result:", result);
});

calculateTotal(order, (result) => {
  console.log("calculateTotal result:", result);
});
checkStock(order, (result) => {
  console.log("checkStock result:", result);
});
