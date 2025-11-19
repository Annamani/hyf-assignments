function getTravelDuration(travelInfo) {
    if (travelInfo.speed <= 0) {
        return "Speed must be greater than zero";
    }
    const distance = travelInfo.destinationDistance;
    const speed = travelInfo.speed;
    const timeinHours = distance / speed;
    const totalHours = Math.floor(timeinHours);
    const minutesRemaining = timeinHours - totalHours;
    const totalMinutes = Math.round(minutesRemaining * 60);
    if (totalHours > 0 && totalMinutes > 0) {
        return `${totalHours} hours and ${totalMinutes} minutes`;
    } else if (totalHours > 0) {
        return `${totalHours} hours`;
    } else {
        return `${totalMinutes} minutes`;
    }
}
const travelInformation = {
    speed: 50,
    destinationDistance: 432,
};

const travelTime = getTravelDuration(travelInformation);
console.log(travelTime); // 8 hours and 38 minutes