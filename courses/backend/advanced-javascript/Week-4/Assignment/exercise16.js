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
  static findCheapest(teas) {
    return teas.reduce((cheapest, tea) =>
      tea.pricePerGram < cheapest.pricePerGram ? tea : cheapest,
    );
  }

  static findMostExpensive(teas) {
    return teas.reduce((expensive, tea) =>
      tea.pricePerGram > expensive.pricePerGram ? tea : expensive,
    );
  }

  static averagePrice(teas) {
    const total = teas.reduce((sum, tea) => sum + tea.pricePerGram, 0);
    return total / teas.length;
  }
}

const teaInstances = teas.map(Tea.fromObject);
console.log(Tea.findCheapest(teaInstances).name);
// "English Breakfast"

console.log(Tea.findMostExpensive(teaInstances).name);
// "Gyokuro"

console.log(Tea.averagePrice(teaInstances).toFixed(2));
// "0.22"
