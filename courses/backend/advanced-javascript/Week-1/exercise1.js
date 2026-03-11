import { teas as data } from "../data/teas.js";
// Exercise 1: Rewrite with Array Methods
const result = data
  .filter((tea) => tea.caffeineLevel !== "none")
  .map((tea) => tea.name.toUpperCase());
console.log(result);
