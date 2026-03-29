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
}
class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    if (!this.items.includes(orderItem)) return this.items.push(orderItem);
    else throw new Error("error while pushing data");
  }

  confirm() {
    if (this.status === "pending") {
      this.status = "confirmed";
    }
  }

  ship() {
    if (this.status === "confirmed") {
      this.status = "shipped";
    }
  }

  deliver() {
    if (this.status === "shipped") {
      this.status = "delivered";
    }
  }
}

const order = new Order();
const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
order.addItem(new OrderItem(sencha, 100));
console.log(order.status); // "pending"

order.confirm();
console.log(order.status); // "confirmed"

order.addItem(new OrderItem(sencha, 50));
// Error: "Cannot add items to a confirmed order"

order.ship();
order.deliver();
console.log(order.status); // "delivered"
