import { teas as data } from "../data/teas.js";
// Exercise 5: Search Function
function searchTeas(teas, query) {
  const result = teas
    .filter((tea) => tea.name.toLowerCase().includes(query.toLowerCase()))
    .map((tea) => tea.name);
  return result;
}
console.log(searchTeas(data, "earl")); //[ 'Earl Grey', 'Jasmine Pearl' ]
console.log(searchTeas(data, "dragon")); // [ 'Dragon Well' ]
console.log(searchTeas(data, "ch")); // [ 'Sencha', 'Chamomile', 'Matcha', 'Lapsang Souchong', 'Genmaicha' ]
