const dogYearOfBirth = 2017;
const dogYearFuture = 2027;
const dogYear = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = false;
if (shouldShowResultInDogYears) {
    console.log("Your dog will be " + dogYear + " human years old in " + dogYearFuture);
} else {
    const humanYear = dogYear * 7;
    console.log("Your dog will be " + humanYear + " dog years old in " + dogYearFuture);
}