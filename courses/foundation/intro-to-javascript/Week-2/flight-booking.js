function getFullName(firstName, lastName) {
    if (!firstName && !lastName) {
        console.log("You did not provide any name");
        return
    }

    if (!firstName || firstName.trim() === "") {
        console.log("You did not provide first name");
        return
    }

    if (!lastName || lastName.trim() === "") {
        console.log("You did not provide last name")
        return
    }

    console.log(`${firstName.trim()} ${lastName.trim()}`);
}
const firstName = "Annamani";
const lastName = "Kamma";
getFullName(firstName, lastName); //returns "Annamani Kamma"
getFullName("Benjamin", "Hughes"); // returns "Benjamin Hughes"
getFullName(" ", "james");
getFullName();