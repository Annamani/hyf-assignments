const notes = [];
function saveNote(content, id) {
    // write some code here
    const obj = {
        content,
        id
    };
    notes.push(obj);
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
console.log("Saved notes ", notes);

function getNote(id) {
    for (let i = 0; i < notes.length; i++) {
        if (typeof id == "number") {
            if (id === notes[i].id) {
                return notes[i].content;
            }
        } else {
            return "Please provide an id with number";
        }
    }
}
const firstNote = getNote(1);
const secondNote = getNote(2);
const thirdNote = getNote("anna");
console.log(firstNote);
console.log(secondNote);
console.log(thirdNote);

function logOutNotesFormatted() {
    for (let j = 0; j < notes.length; j++) {
        console.log(`The note with id:${notes[j].id}, has the following note text: ${notes[j].content}`);
    }
}

logOutNotesFormatted(); // should log out the text below

// The note with id: 1, has the following note text: Pick up groceries
// The note with id: 2, has the following note text: Do laundry
