// What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:

// 'abba' & 'baab' == true

// 'abba' & 'bbaa' == true

// 'abba' & 'abbba' == false

// 'abba' & 'abca' == false

// Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:

// anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

// anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']

// anagrams('laser', ['lazing', 'lazy',  'lacer']) => []

const createObj = (str) => {
    let splitString = str.split('');
    let finalObject = {};

    for (let i = 0; i < splitString.length; i++) {
        let currentLetter = splitString[i];

        if (finalObject[currentLetter] === undefined) finalObject[currentLetter] = 0;
        if (finalObject[currentLetter] !== undefined) finalObject[currentLetter] += 1;
    };

    return finalObject;
};

const anagrams = (word, wordsArr) => {
    let wordObj = createObj(word);
    let wordKeys = Object.keys(wordObj).sort().join('');
    let wordValues = Object.values(wordObj).sort((a, b) => {
        return a - b;
    }).join('');

    const finalArray = [];
    for (let i = 0; i < wordsArr.length; i++) {
        let currWordObj = createObj(wordsArr[i]);
        let currWordKeys = Object.keys(currWordObj).sort().join('');
        let currWordValues = Object.values(currWordObj).sort((a, b) => {
            return a - b;
        }).join('');

        if (wordKeys === currWordKeys && wordValues === currWordValues) finalArray.push(wordsArr[i]);
    };

    return finalArray;
};

console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada'])) // => ['aabb', 'bbaa']
console.log(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer'])) // => ['carer', 'racer']
console.log(anagrams('laser', ['lazing', 'lazy',  'lacer'])) // => []