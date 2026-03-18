// Exercise 4: Inventory Aggregation from File
import { teas } from "../data/teas.js";
import fs from "fs";
function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    const order = JSON.parse(data);
    const calculateChanges = order.reduce((acc, teaData) => {
      acc[teaData.teaId] = (acc[teaData.teaId] || 0) + teaData.change;
      return acc;
    }, {});
    const report = Object.keys(calculateChanges).map((id) => {
      const tea = teas.find((t) => t.id === Number(id));
      const change = calculateChanges[id] || 0;
      const newStockCount = tea.stockCount + change;
      const countSign = change >= 0 ? "+" : "";
      const stockValue = newStockCount < 0 ? " (NEGATIVE!)" : "";
      return `- ${tea.name}: was ${tea.stockCount}, change ${countSign}${change}, now ${newStockCount}${stockValue}`;
    });
    console.log("Inventory Report:\n");
    callback(null, report);
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }
  console.log(report);
});
