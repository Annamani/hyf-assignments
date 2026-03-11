import { teas as data } from "../data/teas.js";
function filterTeas(data, obj) {
  const result = Object.entries(obj);
  result.forEach((filterTea) => {
    const objName = filterTea[0];
    const objValue = filterTea[1];
    data = data.filter((tea) => tea[objName] === objValue);
  });
  return data;
}
console.log("All Organic teas: ", filterTeas(data, { organic: true })); // Returns all organic teas
console.log("All Japanese teas: ", filterTeas(data, { origin: "Japan" })); // Returns all Japanese teas
console.log(
  "All organic Japanese teas: ",
  filterTeas(data, { organic: true, origin: "Japan" }),
); // Returns organic Japanese teas
console.log(
  "Green teas that are in stock : ",
  filterTeas(data, { type: "green", inStock: true }),
); // Returns green teas that are in stock
