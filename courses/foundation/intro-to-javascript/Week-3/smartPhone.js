const activities = [];
const usageLimitInMinutes = 30;
function addActivity(date, activity, duration) {
    if (
        typeof activity !== "string" ||
        !activity ||
        typeof duration !== "number" ||
        duration <= 0
    ) {
        console.log("Please provide valid date, activity, and duration!");
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

function showStatus(activities) {
    let totalDuration = 0;
    if (activities.length === 0) {
        console.log("Add some activities before calling showStatus");
    } else {
        for (let i = 0; i < activities.length; i++) {
            totalDuration += activities[i].duration;
        }
        console.log(
            `You have added ${activities.length} activities. They amount to ${totalDuration} min. of usage`
        );
    }
    if (totalDuration >= usageLimitInMinutes) {
        console.log("You have reached your limit, no more smartphoning for you!.");
    }
}
showStatus(activities);
function getMostSpentActivity(activities) {
    let maxDuration = 0;
    let mostSpent = "";
    if (activities.length === 0) {
        console.log("Please add some activities first");
    } else {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].duration > maxDuration) {
                maxDuration = activities[i].duration;
                mostSpent = activities[i].activity;
            }
        }
        console.log(
            `You spent the most time on: ${mostSpent} that is ${maxDuration} minites.`
        );
    }
}
getMostSpentActivity(activities);
