const getReply = (command) => {
    let userName = "";
    let todoList = [];
    command = command.trim();
    if (command.startsWith("Hello my name is")) {
        const name = command.replace("Hello my name is", "").trim();
        getReply.userName = name;
        return `Nice to meet you ${name.toLowerCase()}`;
    }

    if (command === "What is my name?") {
        if (!getReply.userName) {
            return "Sorry, I don't know your name.";
        }
        else {
            return `Your name is ${getReply.userName}`;
        }
    }
    if (command.startsWith("Add") && command.includes("to my todo")) {
        const task = command.replace("Add", "").replace("to my todo", "").trim();
        todoList.push(task);
        return `${task} added to your todo`;
    }
    if (command.startsWith("Remove") && command.includes("from my todo")) {
        const task = command.replace("Remove", "").replace("from my todo", "").trim();
        const taskIndex = todoList.indexOf(task);
        if (taskIndex >= 0) {
            todoList.splice(taskIndex, 1);
            return `${task} removed from your todo`;
        } else {
            return `${task} is not in your todo`;
        }
    }

    if (command === "What is on my todo?") {
        if (todoList.length >= 1) {
            return `You have ${todoList.length} tasks on your todo : ${todoList.join(", ")}`;
        }
        // else {
        //     return "Your todo list is empty.";
        // }
    }
}
console.log(getReply("Hello my name is Benjamin")); // "Nice to meet you benjamin"
console.log(getReply("What is my name?")); // "Your name is Benjamin"
console.log(getReply("Add fishing to my todo")); // "fishing added to your todo"
console.log(getReply("Add singing in the shower to my todo"));  // "singing in the shower added to your todo"
console.log(getReply("Remove fishing from my todo"));   // "fishing removed from your todo"
console.log(getReply("Add cleaning the house to my todo")); // "cleaning the house added to your todo"  
console.log(getReply("What is on my todo?"));   // "You have 2 tasks on your todo: singing in the shower"
console.log(getReply("What day is it today?"));  // "Today is Monday, the 24th of November 2025"
console.log(getReply("what is 3 + 3")); // "3 + 3 is 6"
console.log(getReply("what is 4 * 12"));    // "4 * 12 is 48"
console.log(getReply("Set a timer for 4 minutes")); // "Timer set for 4 minutes"
console.log(getReply("Add reading a book to my todo")); // "reading a book added to your todo"
console.log(getReply("Add going for a walk to my todo"));
console.log(getReply("Remove check all bills from my todo"));