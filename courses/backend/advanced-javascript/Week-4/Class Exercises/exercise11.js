import { teas } from "../../data/teas.js";
let total;
class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
}
class OrderItem {
  constructor(tea, grams) {
    this.tea = tea;
    this.grams = grams;
  }
  getTotal() {
    return this.tea.pricePerGram * this.grams;
  }
}
class Order {
  constructor(tea, grams) {
    this.items = [];
    this.tea = tea;
    this.grams = grams;
  }
  addItem(orderItem) {
    if (!this.items.includes(orderItem)) return this.items.push(orderItem);
    else throw new Error("error while pushing data");
  }
  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.getTotal();
    }, 0);
  }
}
const order = new Order();
order.addItem(
  new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
);
order.addItem(
  new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
);

console.log(order.getTotal()); // 34.5  (12 + 22.5)
