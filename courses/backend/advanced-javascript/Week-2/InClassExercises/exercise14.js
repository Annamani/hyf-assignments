import { teas as data } from "../teas.js";
function findTeaById(id, callback) {
  // setTimeout(function () {
  //   const tea = data.find((t) => t.id === id);
  //   callback(tea);
  // }, 500);

  // Using forEach
  setTimeout(function () {
    data.forEach(function (tea) {
      if (tea.id === id) {
        callback(tea);
      }
    });
  }, 500);
}

// EXERCISE14
// console.log("Looking up tea...");
// findTeaById(3, function (tea) {
//   console.log("Found:", tea.name);
// });
// console.log("Request sent, waiting...");

// EXERCISE15
findTeaById(1, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(5, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(10, function (tea) {
  console.log("Got:", tea.name);
});
console.log("All requests sent!");