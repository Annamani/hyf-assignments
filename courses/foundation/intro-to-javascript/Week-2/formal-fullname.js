function getFullName(name, surname, useFormalName, gender) {
    if (!name && !surname) {
        console.log("You did not provide any name");
        return;
    }

    if (!name || name.trim() === "") {
        console.log("You did not provide first name");
        return;
    }

    if (!surname || surname.trim() === "") {
        console.log("You did not provide last name");
        return;
    }

    if (useFormalName) {
        if (gender === "female") {
            console.log("Madam", name, surname);
        } else {
            console.log("Lord", name, surname);
        }
    } else {
        console.log(name, surname);
    }
}

const firstName = "Annamani";
const lastName = "Kamma";
getFullName(firstName, lastName, true, "female");// returns "Lord Annamani Kamma"
getFullName("Benjamin", "Hughes", false, "male"); // returns "Benjamin Hughes"
getFullName("Jemimag", "Rodgarus", true); //returns "Lord  Jemimag Rodgarus"
getFullName("John", "Minduag");// returns John Minduag
getFullName();