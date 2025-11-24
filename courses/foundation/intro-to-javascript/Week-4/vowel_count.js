// Return the number (count) of vowels in the given string.
const vowels = ['a', 'e', 'i', 'o', 'u'];
function getCount(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < vowels.length; j++) {
            if (str[i] === vowels[j]) {
                count++;
            }
        }
    }
    return count;
}
console.log(getCount("abracadabra"));//output: 5
console.log(getCount("pear tree"));//output: 4
console.log(getCount("o a kak ushakov lil vo kashu kakao"));//output: 13
console.log(getCount("my pyx"));//output: 0