import fs from "fs";

fs.readFile("./orders.json", { encoding: "utf8" }, function (error, data) {
  if (error) {
    console.error(error);
    return;
  }
  const orders = JSON.parse(data);
  console.log(orders);
  console.log(`Number of orders: ${orders.length}`);
  });
