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
function validateOrder(order, callback){
 setTimeout(() => {
    const errors = [];
    order.items.forEach((item) => {
      const exists = data.some((tea) => tea.id === item.teaId);
      if (!exists) {
        errors.push(`Tea with id ${item.teaId} does not exist`);
      }
    });
    const result = {
      valid: errors.length,
      errors: errors,
    };
    callback(result);
  }, 200);
}
// calculateTotal(order, callback);
function calculateTotal(order, callback){
 setTimeout(() => {
   let totalPrice = 0;
   order.items.forEach((item) => {
     const tea = data.find((tea) => tea.id === item.teaId);
     if (tea) {
       totalPrice += tea.pricePerGram * item.grams;
     }
   });
   const result = {
     orderId: order.id,
     total: totalPrice,
   };

   callback(result);
 }, 300);
}
validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

calculateTotal(order, (result) => {
  console.log("Validation result:", result);
});