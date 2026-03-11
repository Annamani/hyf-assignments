import { teas as data } from "../data/teas.js";
// Exercise 4: Teas by Origin ⭐⭐
function teasByOrigin(teas) {
  const result = {};
  teas.forEach((teaElement) => {
    if (!result[teaElement.origin]) result[teaElement.origin] = [];
    result[teaElement.origin].push(teaElement.name);
  });
  return result;
}
console.log(teasByOrigin(data));
