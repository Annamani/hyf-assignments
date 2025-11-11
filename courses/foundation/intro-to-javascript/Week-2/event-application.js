function getEventWeekday(eventDate) {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayDate = new Date().getDate();
    // console.log(todayDate);
    const eventDay = (todayDate + eventDate) % weekDays.length;
    return weekDays[eventDay];

}

console.log(getEventWeekday(10));
console.log(getEventWeekday(2));
console.log(getEventWeekday(20));
