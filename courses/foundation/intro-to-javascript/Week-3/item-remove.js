const names = [
    "Peter",
    "Ahmad",
    "Yana",
    "kristina",
    "Rasmus",
    "Samuel",
    "Katrine",
    "Tala",
];
console.log("Initital Array: ", names)
const nameToRemove = "Ahmad";
// for (let i = 0; i < names.length; i++) {
//     if (names[i] === nameToRemove) {
//         // splice
//         names.splice(i, 1)
//         break

//     }
// }


// const index = names.indexOf(nameToRemove);
// if (index !== -1) {
//     names.splice(index, 1);
// }
//console.log("Modified Array: ", names);

const modifiedArray = names.filter(name => name !== nameToRemove);
console.log("Modified Array: ", modifiedArray); 
