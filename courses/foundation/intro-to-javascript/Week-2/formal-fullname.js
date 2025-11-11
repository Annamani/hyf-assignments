function getFullName(name, surname, useFormalName, gender) {
    if (useFormalName || gender) {
        if (gender === "female") {
            console.log("Madam ", name, surname)
        } else if (gender === "male") {
            console.log("Lord ", name, surname)
        } else {
            console.log(name, surname);
        }
    }
}

const firstName = "Annamani";
const lastName = "Kamma";
getFullName(firstName, lastName, true, "female");// returns "Lord Annamani Kamma"
getFullName("Benjamin", "Hughes", false, "male"); // returns "Benjamin Hughes"
getFullName("Jemimag", "Rodgarus", true); //returns "Lord  Jemimag Rodgarus"
getFullName("John", "Minduag");// returns John Minduag
getFullName();