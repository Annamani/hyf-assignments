// import { teas } from "../data/teas.js";
class Tea {
  constructor(name, type, origin) {
    this.name = name;
    this.type = type;
    this.origin = origin;
  }
}

const sencha = new Tea("Sencha", "green", "Japan");
const earlGrey = new Tea("Earl Grey", "black", "India");

console.log(sencha.name); // "Sencha"
console.log(sencha.type); // "green"
console.log(earlGrey.origin); // "India"
