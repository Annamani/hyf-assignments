import { teas } from "../../data/teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
import { Inventory } from "./exercise3.js";
import { Customer } from "./exercise4.js";

class TeaShop {
  constructor(teaData) {
    this.catalog = teaData.map(Tea.fromObject);
    this.inventory = new Inventory();
    teaData.forEach((t) => {
      const tea = Tea.fromObject(t);
      this.inventory.add(tea, t.stockCount);
    });
    this.customers = [];
  }

  registerCustomer(name, email) {
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    const order = new Order();
    const orderItems = items.map(({ teaName, grams }) => {
      const findTea = this.catalog.find((t) => t.name === teaName);
      if (!findTea) throw new Error(`${teaName} not found `);
      if (this.inventory.getStock(teaName) < grams) {
        throw new Error(`${teaName} is not enough stock`);
      }
      return new OrderItem(findTea, grams);
    });
    orderItems.forEach((item) => {
      this.inventory.sell(item.tea.name, item.grams);
      order.addItem(item);
    });
    customer.placeOrder(order);

    return order;
  }

  getReport() {
    const totalCustomers = this.customers.length;

    const totalOrders = this.customers.reduce((sum, customer) => {
      return sum + customer.ordersArray.length;
    }, 0);

    const totalRevenue = this.customers.reduce((sum, customer) => {
      return sum + customer.totalSpent();
    }, 0);

    const lowStockItems = this.inventory
      .getLowStock(50)
      .map((item) => item.tea.name);

    return [
      "Total Order Report",
      `Customers: ${totalCustomers}`,
      `Orders: ${totalOrders}`,
      `Revenue: ${totalRevenue.toFixed(2)} DKK`,
      `Low stock: ${lowStockItems.join(", ") || "None"}`,
    ].join("\n");
  }
}

// Test:
const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

const order1 = shop.createOrder(alex, [
  { teaName: "Sencha", grams: 100 },
  { teaName: "Matcha", grams: 5 },
]);
console.log(order1.getSummary());

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log(order2.getSummary());

console.log(shop.getReport());
