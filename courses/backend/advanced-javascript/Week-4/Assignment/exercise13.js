import { teas } from "../../data/teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    if (!this.orders.includes(order)) {
      this.orders.push(order);
    }
    return order;
  }

  totalSpent() {
    return this.orders.reduce((total, order) => total + order.getTotal(), 0);
  }
}

const customer = new Customer("Alex", "alex@example.com");
const order1 = new Order();
order1.addItem(
  new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
);
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(
  new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
);
customer.placeOrder(order2);
console.log(customer.orders.length); // 2
console.log(customer.totalSpent()); // 34.5
