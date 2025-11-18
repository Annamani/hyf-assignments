const activities = [];
const usageLimitInMinutes = 30;
function addActivity(date, activity, duration) {
    if (typeof activity !== "string" || !activity || typeof duration !== "number" || duration <= 0) {
        console.log("Please provide valid date, activity, and duration!")
        return;
    }
    const obj = {
        date,
        activity,
        duration,
    };
    activities.push(obj);
}
const todayDate = new Date().toLocaleDateString("en-US");
addActivity("23/7-18", "Youtube", 60);
addActivity(todayDate, "Github", 20);
addActivity(todayDate, "Instagram", 55);
console.log("Activities ", activities);

function showStatus() {
    let totalDuration = 0;
    if (!activities) {
        console.log("Add some activities before calling showStatus");
    } else {
        for (let i = 0; i < activities.length; i++) {
            totalDuration += activities[i].duration;
        }
        console.log(`You have added ${activities.length} activities. They amount to ${totalDuration} min. of usage`);
    }
    if (totalDuration >= usageLimitInMinutes) {
        console.log("You have reached your limit, no more smartphoning for you!.")
    }
}
showStatus(activities); // will log out this "You have added 3 activities. They amount to 78 min. of usage"