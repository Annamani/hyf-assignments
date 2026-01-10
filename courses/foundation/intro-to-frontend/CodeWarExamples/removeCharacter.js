const list = ["eloquent", "country", "person", "ab", "xyz"];
const removeBtn = document.createElement("button");
removeBtn.textContent = "Remove Character";
document.body.appendChild(removeBtn);

removeBtn.addEventListener("click", () => {
    const updatedList = removeCharacter(list);
    const resultDiv1 = document.createElement("div");
    resultDiv1.textContent = `Original List is :${list.join(", ")}`;
    resultDiv1.style.margin = "15px";
    document.body.appendChild(resultDiv1);

    const resultDiv2 = document.createElement("div");
    resultDiv2.textContent = `Updated List is :${updatedList.join(", ")}`;
    resultDiv2.style.margin = "15px";
    document.body.appendChild(resultDiv2);
});

function removeCharacter(arr) {
    return arr.map(str => str.slice(1, -1));
}