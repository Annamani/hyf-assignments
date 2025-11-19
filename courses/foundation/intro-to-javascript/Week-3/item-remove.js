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
const modifiedArray = names.filter(name => name !== nameToRemove);
console.log("Modified Array: ", modifiedArray); 
