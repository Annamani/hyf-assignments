const oddOrEvenBtn = document.createElement("button");
oddOrEvenBtn.innerText = "Run oddOrEven Example";
document.body.appendChild(oddOrEvenBtn);
oddOrEvenBtn.addEventListener("click", () => {

    const resultDiv1 = document.createElement("div");
    const resultText = document.createElement("p");
    resultText.innerText = `oddOrEven([0, 1, 4]) => ${oddOrEven([0, 1, 4])}`;
    resultDiv1.appendChild(resultText);
    document.body.appendChild(resultDiv1);

    const resultDiv2 = document.createElement("div");
    const resultText2 = document.createElement("p");
    resultText2.innerText = `oddOrEven([0]) => ${oddOrEven([0])}`;
    resultDiv2.appendChild(resultText2);
    document.body.appendChild(resultDiv2);

    const resultDiv3 = document.createElement("div");
    const resultText3 = document.createElement("p");
    resultText3.innerText = `oddOrEven([0,-1,-5]) => ${oddOrEven([0, -1, -5])}`;
    resultDiv3.appendChild(resultText3);
    document.body.appendChild(resultDiv3);

});
function oddOrEven(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum % 2 === 0 ? "even" : "odd";
}
