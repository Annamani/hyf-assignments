// Exercise 6: Total Inventory Value (Optional)
import { teas as data } from "../data/teas.js";
const totalValue = data.reduce(
  (sum, tea) => sum + tea.pricePerGram * tea.stockCount,
  0,
);
console.log("Total inventory value:", totalValue);
