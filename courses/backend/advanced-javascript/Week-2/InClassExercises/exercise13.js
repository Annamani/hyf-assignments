import { teas as data } from "../teas.js";
function runAfterDelay(delay, callback) {
  setTimeout(callback, delay);
}

// Test it:
runAfterDelay(2000, function () {
  console.log("This runs after 2 seconds");
});

runAfterDelay(1000, function () {
  console.log("This runs after 1 second");
});

console.log("This runs immediately");
