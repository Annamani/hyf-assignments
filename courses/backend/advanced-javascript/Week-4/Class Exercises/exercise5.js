import { teas } from "../../data/teas.js";
class Tea {
  constructor(name, type, origin, pricePerGram) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
  }
  priceFor(grams) {
    return this.pricePerGram * grams;
  }
}
const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
console.log(sencha.priceFor(100)); // 12
console.log(sencha.priceFor(50)); // 6
