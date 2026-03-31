import { teas } from "../../data/teas.js";
class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
  priceFor(grams) {
    return this.pricePerGram * grams;
  }
  static fromObject(obj) {
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }
}
class OrderItem {
  constructor(tea, grams) {
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.pricePerGram * this.grams;
  }

  describe() {
    const price = this.tea.pricePerGram * this.grams;
    return `${this.grams}g ${this.tea.name} - ${price.toFixed(2)} DKK`;
  }
}

class Order {
  constructor() {
    this.items = [];
    this.status = "confirmed";
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
    const header = `Order  ${this.status} - ${this.items.length} items`;
    const lines = this.items.map((item) => `  ${item.describe()}`);
    const totalLine = `Total: ${this.getTotal().toFixed(2)} DKK`;
    return [header, ...lines, totalLine].join("\n");
  }
}
class Customer {
  constructor(name, email) {
    // Store name, email, and empty orders array
    this.name = name;
    this.email = email;
    this.ordersArray = [];
  }

  placeOrder(order) {
    // Confirm the order and add to this.orders
    if (!this.ordersArray.includes(order)) this.ordersArray.push(order);
    else console.log(`${order} already exists`);
    return this.ordersArray;
  }

  totalSpent() {
    return this.ordersArray.reduce((total, order) => {
      return total + order.getTotal();
    }, 0);
  }

  getOrderHistory() {
    const header = `${this.name} (${this.email}) - ${this.ordersArray.length} orders`;
    const orders = this.ordersArray.map((order, index) => {
      return order.getSummary(index + 1);
    });
    const lifetimeTotal = `Lifetime total: ${this.totalSpent().toFixed(2)} DKK`;
    return [header, "", orders.join("\n\n"), "", lifetimeTotal].join("\n");
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");
// Return formatted string of all orders
// "Alex (alex@example.com) - 2 orders"
// ""
// "Order 1 (confirmed) - 1 item"
// "  100g Sencha - 12.00 DKK"
// "Total: 12.00 DKK"
// ""
// "Order 2 (confirmed) - 1 item"
// "  50g Matcha - 22.50 DKK"
// "Total: 22.50 DKK"
// ""
// "Lifetime total: 34.50 DKK"
