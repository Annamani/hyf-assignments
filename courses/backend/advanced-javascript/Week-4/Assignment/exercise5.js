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
class Inventory {
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
