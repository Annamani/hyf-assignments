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

  describe() {
    return `${this.name} (${this.type}) from ${this.origin} - ${(this.pricePerGram * 100).toFixed(2)} DKK/100g`;
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
class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    super(name, type, origin, pricePerGram, organic);
    this.grade = grade;
  }

  priceFor(grams) {
    const basePrice = super.priceFor(grams);
    if (this.grade === "A") {
      return (basePrice * 1.5).toFixed(2);
    } else if (this.grade === "B") {
      return (basePrice * 1.25).toFixed(2);
    } else if (this.grade === "C") {
      return (basePrice * 1.1).toFixed(2);
    } else {
      return basePrice.toFixed(2);
    }
  }

  describe() {
    super.describe();
    const price = this.priceFor(100);
    return `${this.name} [Grade ${this.grade}] (${this.type}) from ${this.origin} - ${price} DKK/100g`;
  }
}

const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());
// "Gyokuro [Grade A] (green) from Japan - 84.00 DKK/100g"

console.log(gyokuro.priceFor(100));
// 84  (56 * 1.5)

// It's still a Tea:
console.log(gyokuro instanceof Tea); // true
console.log(gyokuro instanceof PremiumTea); // true

const gradeB = new PremiumTea(
  "Silver Needle",
  "white",
  "China",
  0.5,
  true,
  "B",
);
console.log(gradeB.priceFor(100)); // 62.5  (50 * 1.25)

const gradeC = new PremiumTea("Darjeeling", "black", "India", 0.18, false, "C");
console.log(gradeC.priceFor(100)); // 19.8  (18 * 1.1)
