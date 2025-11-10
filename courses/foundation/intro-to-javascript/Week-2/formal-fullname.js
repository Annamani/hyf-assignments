function getFullName(fullName1, fullName2, useFormalName) {
    if (useFormalName) {
        console.log("Lord ", fullName1, fullName2);
    }
    else {
        console.log(fullName1, fullName2);
    }
}
const firstName = "Annamani";
const lastName = "Kamma";
getFullName(firstName, lastName, true);// returns "Lord Annamani Kamma"
getFullName("Benjamin", "Hughes", false); // returns "Benjamin Hughes"
getFullName("Jemimag", "Rodgarus", true); //returns "Lord  Jemimag Rodgarus"
getFullName("John", "Minduag");// returns John Minduag