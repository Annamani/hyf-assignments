const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getEventWeekday(eventDate) {
    const todayDate = new Date().getDay();
    // console.log(todayDate);
    const eventDay = (todayDate + eventDate) % weekDays.length;
    return weekDays[eventDay];

}

console.log(getEventWeekday(10));
console.log(getEventWeekday(2));
console.log(getEventWeekday(20));
