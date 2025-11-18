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
    const totalHours = 24;
    const totalMinutes = 60;
    const daysInYear = 365;
    let totalLifeSpanInMinutes = avgLifeSpan * totalHours * totalMinutes * daysInYear;
    //console.log(totalLifeSpanInMinutes);
    let totalPercentage = 0;
    for (let i = 0; i < seriesDurations.length; i++) {
        const seriesinMinutes = seriesDurations[i].days * totalHours * totalMinutes + seriesDurations[i].hours * totalMinutes + seriesDurations[i].minutes;
        // console.log(seriesinMinutes);
        const percentage = (seriesinMinutes / totalLifeSpanInMinutes) * 100;
        totalPercentage += percentage;
        console.log(`${seriesDurations[i].title} took ${percentage.toFixed(3)}% of my life`);
    }
    console.log(`\nIn total that is ${totalPercentage.toFixed(2)} of my life`)
}

logOutSeriesText();
// Game of thrones took 0.01% of my life
// Sopranos took 0.012% of my life
// The Wire took 0.007% of my life

// In total that is 0.2% of my life