import { teas } from "../../data/teas.js";
class Tea {
  constructor(name, type, origin) {
    this.name = name;
    this.type = type;
    this.origin = origin;
  }
}
class myTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    super(name, type, origin);
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
}
const firstTea = teas[0];
const tea = new myTea(
  firstTea.name,
  firstTea.type,
  firstTea.origin,
  firstTea.pricePerGram,
  firstTea.organic,
);
console.log(tea);
