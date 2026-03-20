// Exercise 4: Inventory Aggregation from File
import { teas } from "../data/teas.js";
import fs from "fs";
function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    let order;
    try {
      order = JSON.parse(data);
    } catch (error) {
      console.error("Failed to parse JSON:", error.message);
      order = {};
    }
    const calculateChanges = order.reduce((acc, teaData) => {
      acc[teaData.teaId] = (acc[teaData.teaId] || 0) + teaData.change;
      return acc;
    }, {});
    const report = teas.map((tea) => {
      const change = calculateChanges[tea.id] || 0;
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
