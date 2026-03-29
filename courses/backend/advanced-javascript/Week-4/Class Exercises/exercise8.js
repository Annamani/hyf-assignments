import { teas } from "../../data/teas.js";
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

  describe() {
    const price = this.tea.pricePerGram * this.grams;
    return `${this.grams}g ${this.tea.name} - ${price.toFixed(2)} DKK`;
  }
}

// const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const items = [
  new OrderItem(teas[0], 100),
  new OrderItem(teas[1], 200),
  new OrderItem(teas[7], 50),
];

items.map((item) => item.describe()).forEach((line) => console.log(line));
// const item = new OrderItem(sencha, 200);
// console.log(item.describe());
// "200g Sencha - 24.00 DKK"
