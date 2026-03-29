import { teas } from "../../data/teas.js";
class Tea {
  constructor(name, type, origin) {
    this.name = name;
    this.type = type;
    this.origin = origin;
  }
}
const teaInstances = teas.map(
  (t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic),
);
console.log(teaInstances.length); // 20
console.log(teaInstances[0].name); // "Sencha"
