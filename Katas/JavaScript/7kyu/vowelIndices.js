// We want to know the index of the vowels in a given word, for example, there are two vowels in the word super (the second and fourth letters).

// So given a string "super", we should return a list of [2, 4].

// Some examples:
// Mmmm  => []
// Super => [2,4]
// Apple => [1,5]
// YoMama -> [1,2,4,6]

// NOTES

//     Vowels in this context refers to: a e i o u y (including upper case)
//     This is indexed from [1..n] (not zero indexed!)


// Iterative Solution

// const vowelIndices = (word) => {
//     let splitWord = word.split('');
//     let vowels = 'AEIOUYaeiouy';
//     let finalArray = [];

//     for (let i = 0; i < splitWord.length; i++) {
//         let currLetter = splitWord[i];

//         if (vowels.includes(currLetter)) finalArray.push(i + 1);
//     };

//     return finalArray;
// };


// Recursive Solution

const vowelIndices = (word, index = 1, finalArray = []) => {
    if (word.length === 0) return finalArray;

    let splitWord = word.split('');
    let vowels = 'AEIOUYaeiouy';
    let currentLetter = splitWord.shift();

    if (vowels.includes(currentLetter)) finalArray.push(index);

    return vowelIndices(splitWord.join(''), index + 1, finalArray);
};