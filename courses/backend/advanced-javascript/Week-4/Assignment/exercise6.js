import { teas } from "../../data/teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";

class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    super(name, type, origin, pricePerGram, organic);
    if (!["A", "B", "C"].includes(grade)) {
      throw new Error("Invalid grade");
    }
    this.grade = grade;
  }

  priceFor(grams) {
    const basePrice = super.priceFor(grams);
    let markup = 1.0;
    if (this.grade === "A") markup = 1.5;
    else if (this.grade === "B") markup = 1.25;
    else if (this.grade === "C") markup = 1.1;
    return basePrice.toFixed(2) * markup;
  }

  describe() {
    // Override: include [Grade A] in description
    super.describe();
    const price = this.priceFor(100);
    return `${this.name} [Grade ${this.grade}] (${this.type}) from ${this.origin} - ${price} DKK/100g`;
  }

  static fromTea(tea, grade) {
    return new PremiumTea(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
      grade,
    );
  }
}
// 2. ExpressOrder extends Order
class ExpressOrder extends Order {
  constructor(expressFee = 25) {
    super();
    this.expressFee = expressFee;
  }

  getTotal() {
    return super.getTotal() + this.expressFee;
  }

  getSummary() {
    const base = super.getSummary();
    return `${base}\nExpress fee: ${this.expressFee.toFixed(2)} DKK`;
  }
}

// Test PremiumTea:
const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());
// "Gyokuro [Grade A] (green) from Japan - 84.00 DKK/100g"
console.log(gyokuro.priceFor(100)); // 84

const upgraded = PremiumTea.fromTea(teas.map(Tea.fromObject)[0], "B");
console.log(upgraded.describe());

// Test ExpressOrder:
const express = new ExpressOrder(25);
express.addItem(new OrderItem(gyokuro, 100));
console.log(express.getSummary());
// Should show items + express fee + total
console.log(express.getTotal()); // 84 + 25 = 109
