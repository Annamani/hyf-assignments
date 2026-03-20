import { teas as data } from "../data/teas.js";
import fs from "fs";
import {
  order,
  validateOrder,
  calculateTotal,
  checkStock,
} from "./exercise2.js";
// Exercise 2: Order Processing System ⭐
function processOrder(order) {
  console.log("Processing order", order.id);
  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");
    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      checkStock(order, (result) => {
        console.log("checkStock result:", result);
      });
    });
  });
}
processOrder(order);
