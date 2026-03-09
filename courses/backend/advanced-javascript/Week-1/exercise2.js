import { teas as data } from "../data/teas.js";
// Exercise 2: Inventory Report ⭐
function inventoryReport(teas) {
    const calculateInventory=teas.map(tea => tea.pricePerGram * tea.stockCount);
    const teaPrice=teas.map(tea => tea.pricePerGram);
  return {
    totalTeas: teas.length,
    inStock: teas.filter(tea => tea.inStock).length,
    outOfStock: teas.filter(tea => !tea.inStock).length,
    totalInventoryValue:calculateInventory.reduce((sum,inventoryValues)=>sum+inventoryValues,0),
    averagePrice: teaPrice.reduce((sum,teaPrice)=>sum+teaPrice,0)/teas.length
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