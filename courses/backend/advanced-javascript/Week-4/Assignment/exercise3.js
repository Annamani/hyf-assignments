import { teas } from "../../data/teas.js";
import { Tea } from "./exercise1.js";
export class Inventory {
  constructor() {
    this.items = new Map();
  }

  add(tea, stockCount) {
    if (this.items.has(tea.name))
      this.items.get(tea.name).stockCount += stockCount;
    else this.items.set(tea.name, { tea, stockCount });
  }

  sell(teaName, grams) {
    const item = this.items.get(teaName);
    if (!item) throw new Error(`${teaName} is not found`);
    if (item.stockCount < grams)
      throw new Error(`${teaName} is not enough stock`);
    item.stockCount -= grams;
  }
  restock(teaName, grams) {
    // Increase stock
    const item = this.items.get(teaName);
    if (!item) throw new Error(`${teaName} is not found`);
    item.stockCount += grams;
  }

  getStock(teaName) {
    // Return current stock count for a tea
    return this.items.has(teaName) ? this.items.get(teaName).stockCount : 0;
  }

  getLowStock(threshold) {
    return Array.from(this.items.values()).filter(
      (item) => item.stockCount < threshold,
    );
  }

  getTotalValue() {
    // Sum of (pricePerGram * stockCount) for all items
    // Use .reduce()
    return Array.from(this.items.values()).reduce((total, item) => {
      return total + item.tea.priceFor(item.stockCount);
    }, 0);
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha")); // 150

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha")); // 100

console.log("Low stock (< 50):");
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);
// Sencha stock: 150
// After selling 50g: 100
// Low stock (< 50):
// - Dragon Well: 45g
// - Matcha: 30g
// - Gyokuro: 0g
// - Silver Needle: 25g
// - Tie Guan Yin: 40g
// - Pu-erh: 0g
// Total inventory value: 259.60 DKK
