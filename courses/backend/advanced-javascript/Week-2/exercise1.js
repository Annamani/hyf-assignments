import { teas as data} from "../data/teas.js";
import fs from "fs";
// Exercise 1: Stock by Caffeine Level
function stockByCaffeine(teas) {
  return teas.reduce((acc, tea) => {
    acc[tea.caffeineLevel]
      ? (acc[tea.caffeineLevel] += tea.stockCount)
      : (acc[tea.caffeineLevel] = tea.stockCount);
    return acc;
  }, {});
}

console.log(stockByCaffeine(data)); // { high: 745, medium: 450, low: 190, none: 635 }