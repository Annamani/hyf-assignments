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
class TeaCatalog {
  constructor(teas) {
    this.teas = teas;
  }

  search(query) {
    return this.teas.filter((tea) =>
      tea.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  filterByType(type) {
    return this.teas.filter(
      (tea) => tea.type.toLowerCase() === type.toLowerCase(),
    );
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
    this.status = "pending";
  }
  addItem(orderItem) {
    if (this.status !== "pending") {
      throw new Error("Cannot add items unless order is pending");
    }

    if (!this.items.includes(orderItem)) {
      this.items.push(orderItem);
    } else {
      throw new Error("Item already exists in order");
    }
  }
  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.getTotal();
    }, 0);
  }
}
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
// 1. Create a TeaCatalog from the tea data
const catalog = new TeaCatalog(
  teas.map((t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)),
);

// 2. Find all Japanese teas
const japaneseTeas = catalog.search("").filter((t) => t.origin === "Japan");

// 3. Create an order with 100g of each Japanese tea
const order = new Order();
japaneseTeas.forEach((tea) => {
  order.addItem(new OrderItem(tea, 100));
});

// 4. Create a customer and place the order
const customer = new Customer("Tea Lover", "lover@tea.com");
customer.placeOrder(order);

// 5. Log the summary
console.log(`${customer.name} ordered ${order.items.length} Japanese teas`);
console.log(`Total: ${customer.totalSpent().toFixed(2)} DKK`);
