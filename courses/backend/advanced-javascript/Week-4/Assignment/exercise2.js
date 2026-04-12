import { teas } from "../../data/teas.js";
import { Tea } from "./exercise1.js";
export class OrderItem {
  constructor(tea, grams) {
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.priceFor(this.grams);
  }

  describe() {
    const price = this.tea.priceFor(this.grams);
    return `${this.grams}g ${this.tea.name} - ${Number(price).toFixed(2)} DKK`;
  }
}

export class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    if (!this.items.includes(orderItem)) return this.items.push(orderItem);
    else throw new Error("error while pushing data");
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.lineTotal();
    }, 0);
  }
  getSummary() {
    const header = `Order (${this.status}) - ${this.items.length} items`;
    const lines = this.items.map((item) => `  ${item.describe()}`);
    return [header, ...lines].join("\n");
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const order = new Order();
order.addItem(new OrderItem(teaInstances[0], 200)); // Sencha
order.addItem(new OrderItem(teaInstances[7], 50)); // Matcha

console.log(order.getSummary());
console.log("Total:", order.getTotal().toFixed(2), "DKK");
// "Order (pending) - 2 items"
// "  200g Sencha - 24.00 DKK"
// "  50g Matcha - 22.50 DKK"
// "Total: 46.50 DKK"
