console.log("I love pizza");
const myFavouritePizza = "Spicy Chicken Pizza";
const pizzaPrice = 85;
console.log("New pizza order: " + myFavouritePizza + "." + "The price of the pizza is: " + pizzaPrice + "."
);

const orderPizza = 2;
let isFamilySizePizza´=false;
let totalPrice=0;

isFamilySizePizza = true;
if (isFamilySizePizza) {
    totalPrice = orderPizza * (pizzaPrice * 2);
} else {
    totalPrice = orderPizza * pizzaPrice;
}
console.log("Order details:");
console.log("New pizza order: " + orderPizza + " " + isFamilySizePizza + " " + myFavouritePizza + ". Total cost for the order is: " + totalPrice + ".");

pizzaPrice = 90;
isFamilySizePizza = false;
if (isFamilySizePizza) {
    totalPrice = orderPizza * (pizzaPrice * 2);
} else {
    totalPrice = orderPizza * pizzaPrice;
}

console.log("Order details:");
console.log("New pizza order: " + orderPizza + " " + isFamilySizePizza + " " + myFavouritePizza + ". Total cost for the order is: " + totalPrice + ".");
