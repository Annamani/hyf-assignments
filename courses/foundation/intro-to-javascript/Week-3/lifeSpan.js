const seriesDurations = [
    {
        title: "Game of thrones",
        days: 3,
        hours: 1,
        minutes: 0,
    },
    {
        title: "Sopranos",
        days: 3,
        hours: 14,
        minutes: 0,
    },
    {
        title: "The Wire",
        days: 2,
        hours: 12,
        minutes: 0,
    },
];

function logOutSeriesText() {
    const avgLifeSpan = 80;
    const HoursInDay = 24;
    const totalMinutes = 60;
    const daysInYear = 365;
    const totalLifeSpanInMinutes = avgLifeSpan * HoursInDay * totalMinutes * daysInYear;
    let totalPercentage = 0;
    for (let i = 0; i < seriesDurations.length; i++) {
        const seriesinMinutes = seriesDurations[i].days * HoursInDay * totalMinutes + seriesDurations[i].hours * totalMinutes + seriesDurations[i].minutes;
        // console.log(seriesinMinutes);
        const percentage = (seriesinMinutes / totalLifeSpanInMinutes) * 100;
        totalPercentage += percentage;
        console.log(`${seriesDurations[i].title} took ${percentage.toFixed(3)}% of my life`);
    }
    console.log(`\nIn total that is ${totalPercentage.toFixed(2)} of my life`)
}

logOutSeriesText();
