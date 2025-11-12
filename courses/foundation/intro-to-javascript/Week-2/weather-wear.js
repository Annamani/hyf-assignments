function getWhatToWear(temp) {
    if (temp >= 20)
        return "Wear: T-shirt or light shirt, maybe shorts, sunglasses";
    else if (temp >= 15)
        return "Wear: long-sleeve shirt, maybe light jacket, jeans";
    else if (temp >= 10)
        return "Wear:  sweater or fleece + jacket, trousers, possibly a scarf";
    else if (temp >= 5)
        return "Wear:  warm jacket , sweater underneath,hat/gloves optional, waterproof shoes";
    else
        return "Wear:  heavy winter coat, hat, gloves, scarf, warm boots";

}
const clothesToWear = getWhatToWear(9);
console.log(clothesToWear);