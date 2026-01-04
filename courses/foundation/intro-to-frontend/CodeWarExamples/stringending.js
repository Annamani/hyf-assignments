const stringList = [
    { str: "abc", ending: "bc" },
    { str: "abc", ending: "d" },
];

function solution(str, ending) {
    if (ending.length > str.length) {
        return false;
    }
    return str.endsWith(ending);
}
const stringEndingBtn = document.createElement("button");
stringEndingBtn.textContent = "Check String Ending";
document.body.appendChild(stringEndingBtn);
stringEndingBtn.addEventListener("click", () => {
    const resultDiv = document.createElement("div");

    for (const item of stringList) {
        const result = solution(item.str, item.ending);
        const resultText = document.createElement("p");
        resultText.textContent = `Does "${item.str}" end with "${item.ending}"? : ${result}`;
        resultDiv.appendChild(resultText);
    }
    document.body.appendChild(resultDiv);
});