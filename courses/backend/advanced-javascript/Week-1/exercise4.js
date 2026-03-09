import { teas as data } from "../data/teas.js";
// Exercise 4: Teas by Origin ⭐⭐
function teasByOrigin(teas) {
  // Return object where keys are origins and values are arrays of tea names
  const teaOrigins = [...new Set(teas.map((tea) => tea.origin))];
  const result = {};
  teaOrigins.map((origin) => {
    result[origin] = teas
      .filter((tea) => tea.origin === origin)
      .map((tea) => tea.name);
  });
  return result;
}

console.log(teasByOrigin(data));

