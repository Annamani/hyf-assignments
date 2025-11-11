const boughtCandyPrices = []
function addCandy(candyType, weight) {
    let pricePerGram = 0;
    if (candyType === "sweet")
        pricePerGram = 0.5;
    else if (candyType === "Chocolate")
        pricePerGram = 0.7;
    else if (candyType === "Toffee")
        pricePerGram = 1.1;
    else if (candyType === "Chewing-gum")
        pricePerGram = 0.03;
    else {
        console.log("Sorry this candy is not available ");
        return;
    }
    const totalCost = Math.round(weight * pricePerGram);
    boughtCandyPrices.push(totalCost);
    console.log(boughtCandyPrices);
}

function canBuyMoreCandy(candyArray, remainingAmount) {
    let expenses = 0;
    let i = 0;
    // for (let i = 0; i < candyArray.length; i++) {
    //     expenses += candyArray[i];
    // }
    // console.log(expenses);
    while (i < candyArray.length) {
        expenses += candyArray[i];
        i++;
    }
    if (remainingAmount > expenses) {
        console.log("You can buy more, so please do!");
    } else {
        console.log("Enough candy for you!");
    }
}

addCandy("sweet", 20);
addCandy("Chewing-gum", 2);
addCandy("Toffee", 25);
addCandy("Chocolate", 9);
addCandy("Marshmallows", 30);
const amountToSpend = Math.random() * 100;
console.log("Amount to spend: " + Math.floor(amountToSpend));
canBuyMoreCandy(boughtCandyPrices, amountToSpend);


