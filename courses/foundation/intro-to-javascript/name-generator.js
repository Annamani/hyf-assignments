const firstWords = ['Easy', 'Awesome', 'Corporate', 'Innovative', 'Dynamic', 'Global', 'NextGen', 'Agile', 'Smart', 'Scalable'];
const secondWords = ['Solutions', 'Technologies', 'Systems', 'Concepts', 'Match', 'Strategies', 'Applications', 'Platforms', 'Networks', 'Services'];
//create a variable called startupName.
const startupName = firstWords[Math.floor(Math.random() * firstWords.length)] + " " + secondWords[Math.floor(Math.random() * secondWords.length)];

console.log(startupName);

