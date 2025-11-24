function squareDigits(num) {
    let result = '';
    if (num === 0) return 0;
    while (num > 0) {
        let digit = num % 10;
        let squaredNumber = digit * digit;
        result = squaredNumber.toString() + result;
        num = Math.floor(num / 10);
    }
    return result;
}
console.log(squareDigits(9119)); // Output: 811181
console.log(squareDigits(765)); // Output: 493625
console.log(squareDigits(0));    // Output: 0
console.log(squareDigits(3212));  // Output: 9414
console.log(squareDigits(89));   // Output: 6481