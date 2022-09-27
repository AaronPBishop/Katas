// In this kata you have to create all permutations of a non empty input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

// Examples:

// * With input 'a'
// * Your function should return: ['a']
// * With input 'ab'
// * Your function should return ['ab', 'ba']
// * With input 'aabb'
// * Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']

// The order of the permutations doesn't matter.

const permutations = (string, finalArray = [], i = 0, visited =  new Set()) => {
    if (string.length === 2) {
        if (string.split('')[0] === string.split('')[1]) {
            finalArray.push(string);
            return finalArray;
        };
    };

	if (string.length <= 2 && finalArray.length === string.length) return finalArray;
    if (i === 5000) return finalArray;

    const splitString = string.split('');

    for (let i = splitString.length - 1; i > 0; i--) {
        let randNum = Math.floor(Math.random() * (i + 1));
        let replacement = splitString[i];

        splitString[i] = splitString[randNum];
        splitString[randNum] = replacement;
    };

    if (!visited.has(splitString.join(''))) finalArray.push(splitString.join(''));
    visited.add(splitString.join(''));

    return permutations(string, finalArray, i += 1, visited);
};