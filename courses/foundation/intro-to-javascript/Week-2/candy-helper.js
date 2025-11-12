const boughtCandyPrices = []
const myCandy = [];
let expenses = 0;
const amountToSpend = Math.random() * 100;
console.log("Amount to spend: ", Number(amountToSpend.toFixed(2)));
function addCandy(candyType, weight) {
    let pricePerGram = 0;
    if (candyType === "Sweet")
        pricePerGram = 0.5;
    else if (candyType === "Chocolate")
        pricePerGram = 0.7;
    else if (candyType === "Toffee")
        pricePerGram = 1.1;
    else if (candyType === "Chewing-gum")
        pricePerGram = 0.03;
    else {
        console.log("Sorry this candy is not available: ", candyType);
        return;
    }
    const totalCost = Number((weight * pricePerGram).toFixed(2));
    boughtCandyPrices.push(totalCost);
    myCandy.push(candyType);
    // console.log(boughtCandyPrices);
}

function canBuyMoreCandy() {

    let i = 0;
    // for (let i = 0; i < candyArray.length; i++) {
    //     expenses += candyArray[i];
    // }
    // console.log(expenses);
    while (i < boughtCandyPrices.length) {
        expenses += boughtCandyPrices[i];
        i++;
    }
    if (amountToSpend > expenses) {
        console.log("You can buy more, so please do!");
    } else {
        console.log("Enough candy for you!");
    }
}

addCandy("Sweet", 20);
addCandy("Chewing-gum", 2);
addCandy("Toffee", 25);
addCandy("Chocolate", 9);
addCandy("Marshmallows", 30);
canBuyMoreCandy();

console.log("Total spent:", expenses.toFixed(2));
console.log("Bought candy prices:", boughtCandyPrices);
console.log("Candy types:", myCandy);

