function highAndLow(numbers) {
    const numArray = numbers.split(' ');
    for (let num of numArray) {
        numArray[num] = parseInt(numArray[num]);
    }
    let maxNum = numArray[0];
    let minNum = numArray[0];
    if (numArray.length === 0) {
        console.log("Please provide a valid input");
    } else {
        for (let i = 1; i < numArray.length; i++) {
            if (numArray[i] > maxNum) {
                maxNum = numArray[i];
            }
            if (numArray[i] < minNum) {
                minNum = numArray[i];
            }
        }
        console.log(`"${maxNum} ${minNum}"`);
    }
}
highAndLow("1 2 3 4 5"); // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"