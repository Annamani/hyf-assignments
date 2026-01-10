const exerciseInput = document.getElementById("exerciseInput");
const exerciseBtn = document.getElementById("exerciseBtn");
const resultDiv = document.getElementById("exerciseResult");
//when user clicks the button, get the input value and display greeting
exerciseBtn.addEventListener("click", function () {
    const name = exerciseInput.value.trim();
    if (name === "") {
        resultDiv.textContent = "Please enter your name.";
        return;
    }
    resultDiv.textContent = `Hello, ${name}! Welcome to the exercise.`;

});