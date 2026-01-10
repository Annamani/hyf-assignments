const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
const generateBtn = document.querySelector("#primary-btn");
const result = document.querySelector(".result");
const resultDescription = document.querySelector(".result-description");
const userNameInput = document.querySelector("#fullName");

function getUserHouse() {
    const userName = userNameInput.value;
    if (userName.trim() === "") {
        result.textContent = "Please enter your name.";
        return;
    } else if (userName.length < 3) {
        result.textContent = "Name must be at least 3 characters long.";
        return;
    }
    const houseIndex = Math.floor(Math.random() * houses.length);
    const assignedHouse = houses[houseIndex];
    const houseDescription = getHouseDescription(assignedHouse);
    result.textContent = `${userName}, belongs to ${assignedHouse}!`;
    resultDescription.textContent = `${houseDescription}`;
    result.style.display = "block";
    result.style.marginTop = "20px";
    generateBtn.textContent = "Try Again";
}
function getHouseDescription(house) {
    switch (house) {
        case "Gryffindor":
            return "Gryffindor is known for courage, bravery, and determination. Students are often seen as brave and loyal.";
        case "Hufflepuff":
            return "Hufflepuff values hard work, dedication, patience, loyalty, and fair play. Students are often seen as kind and trustworthy.";
        case "Ravenclaw":
            return "Ravenclaw is known for intelligence, wisdom, and creativity. Students are often seen as clever and curious.";
        case "Slytherin":
            return "Slytherin is known for ambition, cunning, and resourcefulness. Students are often seen as ambitious and determined.";
        default:
            return "";
    }
}

generateBtn.addEventListener("click", getUserHouse);
