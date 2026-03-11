import { teas as data } from "../data/teas.js";
// Exercise 3: Low Stock Alert (less than 50 items)
function lowStockAlert(teas) {
  const result = teas
    .filter((tea) => tea.stockCount < 50)
    .map((tea) => ({
      name: tea.name,
      stockCount: tea.stockCount,
    }))
    .sort((teaStock1,teaStock2) => teaStock1.stockCount - teaStock2.stockCount);
  return result;
}

console.log(lowStockAlert(data));
