import { teas } from "../../data/teas.js";
const typeofTeas = ["green", "black", "herbal", "oolong", "white"];
class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) {
      throw new Error("name is missing");
    } else if (!typeofTeas.includes(type)) {
      throw new Error("Type is missing");
    } else if (!origin) {
      throw new Error("Origin is not defined");
    } else if (pricePerGram < 0) {
      throw new Error("Price must be positive");
    } else if (!organic) {
      throw new Error("Organic data is not provided");
    } else {
      this.name = name;
      this.type = type;
      this.origin = origin;
      this.pricePerGram = pricePerGram;
      this.organic = organic;
    }
  }
}

// Should work:
const valid = new Tea("Sencha", "green", "Japan", 0.12, true);
console.log(valid);
// Should throw:

const noName = new Tea("", "green", "Japan", 0.12, true);
console.log(noName);
Error: "Name is required";

const badPrice = new Tea("Sencha", "green", "Japan", -1, true);
// Error: "Price must be positive"
console.log(badPrice);

const badType = new Tea("Sencha", "purple", "Japan", 0.12, true);
// Error: "Invalid type: purple"
console.log(badType);
