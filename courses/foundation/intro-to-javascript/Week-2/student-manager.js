const class07Students = [];
function addStudentToClass(studentName) {
    if (!studentName) {
        console.log("You cannot add an empty name to the class");
        return;
    }
    if (class07Students.length > 6) {
        console.log("Cannot add more students to class 07");
        return;
    }
    if (class07Students.includes(studentName)) {
        console.log(`Student ${studentName} is already in the class`);
        return;
    }

    if (studentName === "Queen" && !class07Students.includes("Queen")) {
        class07Students.push(studentName);
        console.log("The Queen has been added to the class!");
        return;
    }
    else {
        class07Students.push(studentName);
    }
}

function getNumberOfStudents() {
    return class07Students.length;
}
//Testcases
addStudentToClass();
addStudentToClass("Anna");
addStudentToClass("Aasha");
addStudentToClass("Aneta");
addStudentToClass("Petersen");
addStudentToClass("Michael");
addStudentToClass("Aasha");
addStudentToClass("Larz");
addStudentToClass("Queen");
addStudentToClass("Aasha");
addStudentToClass("Anu");
console.log(class07Students);
console.log("Total students: ", getNumberOfStudents());