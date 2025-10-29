const changeColorBtn = document.getElementsByClassName("colorButton")[0];
changeColorBtn.addEventListener("click", () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    document.body.style.background = "rgb(" + red + ", " + green + ", " + blue + ")";
});

// Set current year in footer
const yearSpan = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;
