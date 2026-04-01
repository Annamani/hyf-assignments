import { teas } from "../../data/teas.js";
import { Tea } from "./exercise1.js";
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

const catalog = new TeaCatalog(
  teas.map((t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)),
);

console.log(catalog.search("earl"));
// [Tea { name: "Earl Grey", ... }]

console.log(catalog.filterByType("green").map((t) => t.name));
// ["Sencha", "Dragon Well", "Matcha", "Genmaicha", "Jasmine Pearl", ...]
