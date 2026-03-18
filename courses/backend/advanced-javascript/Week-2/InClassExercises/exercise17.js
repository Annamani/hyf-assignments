import { teas } from "../teas.js";
import fs from "fs";

fs.readFile("./orders.json", { encoding: "utf8" }, function (error, data) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(data);
  const orders = JSON.parse(data);
  orders.forEach(order => {
  let total = 0;
  order.items.forEach(item => {
    teas.forEach(tea => {
      if (tea.id === item.teaId)    total += tea.pricePerGram * item.grams;
    });
  });
  console.log(`Order ${order.id}: ${total.toFixed(2)} DKK (${order.items.length} item)`);
});
});