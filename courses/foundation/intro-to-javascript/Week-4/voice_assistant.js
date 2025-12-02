let userName = "";
const todoList = [];
const today = new Date();
const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const secondsInMinute = 60;
const millisecondsInSecond = 1000;
const millisecondsInMinute = secondsInMinute * millisecondsInSecond;

const getReplyUserName = (command) => {
    const name = command.replace("Hello my name is", "").trim();
    userName = name;
    return `Nice to meet you ${name.toLowerCase()}`;
};
const getUserName = (userName) => {
    if (!userName) {
        return "Sorry, I don't know your name.Please provide your name.";
    } else {
        return `Your name is ${userName}`;
    }
};
const addToDo = (command, todoList) => {
    const task = command.replace("Add", "").replace("to my todo", "").trim();
    if (!task) {
        return "Please specify a task to add to your todo.";
    }
    todoList.push(task);
    return `${task} added to your todo`;
};
const removeTask = (command, todoList) => {
    const taskName = command.replace("remove", "").replace("from my todo", "").trim();
    if (todoList.indexOf(taskName) !== -1) {
        todoList.splice(todoList.indexOf(taskName), 1);
        return `${taskName} removed from your todo`;
    } else {
        return `${taskName} is not in your todo`;
    }
};
const getTodoList = (todoList) => {
    if (!todoList.length) {
        return "Your todo list is empty.";
    } else {
        return `You have ${todoList.length} tasks on your todo : ${todoList.join(
            " , "
        )}`;
    }
};
const getTodayDetails = (today, weekDays, months) => {
    return `Today is ${weekDays[today.getDay()]}, ${today.getDate()}. of ${months[today.getMonth()]
        } ${today.getFullYear()}`;
};
const getOperationResult = (command) => {
    const expression = command.replace("what is", "").trim();
    const operators = ["+", "-", "*", "/"];
    for (let operator of operators) {
        if (expression.includes(operator)) {
            const expressionParts = expression
                .split(operator)
                .map((part) => part.trim());
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
};
const setTimer = (command) => {
    const timePart = command
        .replace("Set a timer for", "")
        .replace("minutes", "")
        .trim();
    setTimeout(() => {
        return "Timer done";
    }, timePart * millisecondsInMinute);
    return `Timer set for ${timePart} minutes`;
};

const getReply = (command) => {
    const lowerCaseCommand = command.toLowerCase();
    if (lowerCaseCommand.startsWith("hello my name is")) {
        return getReplyUserName(command);
    }
    if (lowerCaseCommand === "what is my name?") {
        return getUserName(userName);
    }
    if (lowerCaseCommand.startsWith("add") && lowerCaseCommand.includes("to my todo")) {
        return addToDo(command, todoList);
    }
    if (lowerCaseCommand.startsWith("remove") && lowerCaseCommand.includes("from my todo")) {
        return removeTask(command, todoList);
    }

    if (lowerCaseCommand === "what is on my todo?") {
        return getTodoList(todoList);
    }
    if (lowerCaseCommand === "what day is it today?") {
        return getTodayDetails(today, weekDays, months);
    }
    if (lowerCaseCommand.startsWith("what is")) {
        return getOperationResult(command);
    }

    if (lowerCaseCommand.startsWith("set a timer for") && lowerCaseCommand.includes("minutes")) {
        return setTimer(command);
    }
    return "I'm sorry, I didn't understand that command.";
};

console.log(getReply("Hello my name is Benjamin")); // "Nice to meet you benjamin"
console.log(getReply("What is my name?")); // "Your name is Benjamin"
console.log(getReply("Add fishing to my todo")); // "fishing added to your todo"
console.log(getReply("Add singing in the shower to my todo")); // "singing in the shower added to your todo"
console.log(getReply("Remove fishing from my todo")); // "fishing removed from your todo"
console.log(getReply("Add cleaning the house to my todo")); // "cleaning the house added to your todo"
console.log(getReply("What is on my todo?")); // "You have 2 tasks on your todo: singing in the shower"
console.log(getReply("What day is it today?")); // "Today is Monday, the 24th of November 2025"
console.log(getReply("what is 3 + 3")); // "3 + 3 is 6"
console.log(getReply("what is 4 * 12")); // "4 * 12 is 48"
//console.log(getReply("Set a timer for 4 minutes")); // "Timer set for 4 minutes"
console.log(getReply("Add reading a book to my todo")); // "reading a book added to your todo"
console.log(getReply("Add going for a walk to my todo")); // "going for a walk added to your todo"
console.log(getReply("Remove check all bills from my todo")); // "check all bills is not in your todo"
console.log(getReply("What is on my todo?")); // "You have 4 tasks on your todo: singing in the shower , cleaning the house , reading a book , going for a walk"\
console.log(getReply("open google")); // "I'm sorry, I didn't understand that command."
console.log(getReply("How is the weather today?")); // "I'm sorry, I didn't understand that command."
console.log(getReply("remove cleaning the house from my todo"));
