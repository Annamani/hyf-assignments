const sheepList = [
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    null,
];
const countSheepBtn = document.createElement("button");
countSheepBtn.textContent = "Count Sheep";
document.body.appendChild(countSheepBtn);

countSheepBtn.addEventListener("click", () => {
    const sheepCount = countSheeps(sheepList);
    const resultDiv = document.createElement("div");
    resultDiv.textContent = `Number of sheep: ${sheepCount}`;
    document.body.appendChild(resultDiv);
});
function countSheeps(arrayOfSheep) {
    let count = 0;
    for (let i = 0; i < arrayOfSheep.length; i++) {
        if (arrayOfSheep[i] === null || arrayOfSheep[i] === undefined) {
            continue;
        }
        if (arrayOfSheep[i] === true) {
            count++;
        }
    }
    return count;
}

console.log(countSheeps(sheepList));