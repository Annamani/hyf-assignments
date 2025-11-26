const getReply = (command) => {
    let userName = "";
    let todoList = [];
    if (command.startsWith("Hello my name is")) {
        const name = command.replace("Hello my name is", "").trim();
        getReply.userName = name;
        return `Nice to meet you ${name.toLowerCase()}`;
    }

    if (command === "What is my name?") {
        if (!getReply.userName) {
            return "Sorry, I don't know your name.Please provide your name.";
        }
        else {
            return `Your name is ${getReply.userName}`;
        }
    }
    if (command.startsWith("Add") && command.includes("to my todo")) {
        const task = command.replace("Add", "").replace("to my todo", "").trim();
        if (!task) {
            return "Please specify a task to add to your todo.";
        }
        todoList = getReply.todoList || [];
        todoList.push(task);
        getReply.todoList = todoList;
        // console.log(todoList);
        return `${task} added to your todo`;
    }
    if (command.startsWith("Remove") && command.includes("from my todo")) {
        const taskName = command.replace("Remove", "").replace("from my todo", "").trim();
        todoList = getReply.todoList || [];
        if (todoList.indexOf(taskName) !== -1) {
            todoList.splice(todoList.indexOf(taskName), 1);
            return `${taskName} removed from your todo`;
        }
        else {
            return `${taskName} is not in your todo`;
        }
    }

    if (command === "What is on my todo?") {
        todoList = getReply.todoList || [];
        if (todoList.length >= 1) {
            return `You have ${todoList.length} tasks on your todo : ${todoList.join(", ")}`;
        } else {
            return "Your todo list is empty.";
        }
    }
    if (command === "What day is it today?") {
        const today = new Date();
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `Today is ${weekDays[today.getDay()]}, ${today.getDate()}. of ${months[today.getMonth()]} ${today.getFullYear()}`;
    }
    if (command.startsWith("what is")) {
        const expression = command.replace("what is", "").trim();
        // console.log(expression);
        const operators = ["+", "-", "*", "/"];
        for (let operator of operators) {
            if (expression.includes(operator)) {
                const expressionParts = expression.split(operator).map(part => part.trim());
                // console.log(expressionParts);
                if (expressionParts.length === 2) {
                    const num1 = parseFloat(expressionParts[0]);
                    const num2 = parseFloat(expressionParts[1]);
                    let result;
                    switch (operator) {
                        case "+":
                            result = num1 + num2;
                            break;
                        case "-":
                            result = num1 - num2;
                            break;
                        case "*":
                            result = num1 * num2;
                            break;
                        case "/":
                            result = num1 / num2;
                            break;
                    }
                    return `${expression} is ${result}`;
                }
            }
        }
    }

    if (command.startsWith("Set a timer for") && command.includes("minutes")) {
        const timePart = command.replace("Set a timer for", "").replace("minutes", "").trim();
        setTimeout(() => {
            return "Timer done";
        }, 4 * 60 * 1000);
        return `Timer set for ${timePart} minutes`;
    }
    return "I'm sorry, I didn't understand that command."
};
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
console.log(getReply("Add going for a walk to my todo"));   // "going for a walk added to your todo"
console.log(getReply("Remove check all bills from my todo")); // "check all bills is not in your todo"
console.log(getReply("What is on my todo?"));   // "You have 4 tasks on your todo: singing in the shower , cleaning the house , reading a book , going for a walk"\
console.log(getReply("open google")); // "I'm sorry, I didn't understand that command."
console.log(getReply("How is the weather today?")); // "I'm sorry, I didn't understand that command."