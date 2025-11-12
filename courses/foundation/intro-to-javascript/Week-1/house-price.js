
//Peter house 8m wide, 10m deep, 10m high. garden size is 100m2 . house costs 2.500.000.

const peterWidth = 8;
const peterDepth = 10;
const peterHeight = 10;
const peterGardenSize = 100;
const peterHousePrice = 2500000;

//housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
//volume= width * depth * height
const peterVolume = peterWidth * peterDepth * peterHeight;
const peterEstimatedPrice = peterVolume * 2.5 * 1000 + peterGardenSize * 300;
console.log("Peter house estimated price is : " + peterEstimatedPrice);
if (peterEstimatedPrice > peterHousePrice) {
    console.log("Peter is paying too less.");
} else if (peterEstimatedPrice < peterHousePrice) {
    console.log("Peter is paying too much.");
} else {
    console.log("Peter is paying the right price.");
}



//Julia house 5m wide, 11m deep, 8m high. garden size is 70m2 . house costs 1.000.000.
const juliaWidth = 5;
const juliaDepth = 11;
const juliaHeight = 8;
const juliaGardenSize = 70;
const juliaHousePrice = 1000000;

//housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
//volume= width * depth * height
const juliaVolume = juliaWidth * juliaDepth * juliaHeight;
const juliaEstimatedPrice = juliaVolume * 2.5 * 1000 + juliaGardenSize * 300;
console.log("Julia house estimated price is : " + juliaEstimatedPrice);

if (juliaEstimatedPrice > juliaHousePrice) {
    console.log("Julia is paying too less.");
} else if (juliaEstimatedPrice < juliaHousePrice) {
    console.log("Julia is paying too much.");
} else {
    console.log("Julia is paying the right price.");
}