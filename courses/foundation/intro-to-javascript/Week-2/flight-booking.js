function getFullName(fullName1, fullName2) {
    console.log(fullName1, fullName2);
    // console.log('"' + fullName1, fullName2 + '"');
}
const firstName = "Annamani";
const lastName = "Kamma";
getFullName(firstName, lastName); //returns "Annamani Kamma"
getFullName("Benjamin", "Hughes"); // returns "Benjamin Hughes"
getFullName(" ", "james");
getFullName();