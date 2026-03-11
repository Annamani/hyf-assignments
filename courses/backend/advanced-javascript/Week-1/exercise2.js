import { teas as data } from "../data/teas.js";
// Exercise 2: Inventory Report ⭐
function inventoryReport(teas) {
  let inventoryValue=0;
  let totalTeaPrice=0;
  teas.forEach((tea)=>{
    inventoryValue+=tea.pricePerGram * tea.stockCount;
    totalTeaPrice+=tea.pricePerGram;
  });
  return {
    totalTeas: teas.length,
    inStock: teas.filter((tea) => tea.inStock).length,
    outOfStock: teas.filter((tea) => !tea.inStock).length,
    totalInventoryValue:inventoryValue,
    averagePrice:totalTeaPrice/ teas.length,
  };
}
console.log(inventoryReport(data));
//output:
// {
//   totalTeas: 20,
//   inStock: 18,
//   outOfStock: 2,
//   totalInventoryValue: 265.6,
//   averagePrice: 0.2205
// }
