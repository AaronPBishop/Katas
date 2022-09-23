// In this kata you have to create all permutations of a non empty input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

// Examples:

// * With input 'a'
// * Your function should return: ['a']
// * With input 'ab'
// * Your function should return ['ab', 'ba']
// * With input 'aabb'
// * Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']

// The order of the permutations doesn't matter.

const checkUnique = (arr) => {
    const visited = new Set();
    arr.forEach(str => {
        if (!visited.has(str)) visited.add(str);
    });

    if (Array.from(visited).length === arr.length) return true;
    return false;
};

const permutations = (string, finalArray = []) => {
    if (string.length <= 2 && finalArray.length === string.length && !checkUnique(finalArray)) {
        finalArray = [];
        return permutations(string, finalArray)
    };
	if (string.length <= 2 && finalArray.length === string.length && checkUnique(finalArray)) return finalArray;

    if (string.length === 3 && finalArray.length === (string.length * 2) && !checkUnique(finalArray)) {
        finalArray = [];
        return permutations(string, finalArray)
    };
	if (string.length === 3 && finalArray.length === (string.length * 2) && checkUnique(finalArray)) return finalArray;

    if (string.length === 4 && finalArray.length === (string.length * 6) && !checkUnique(finalArray)) {
        finalArray = [];
        return permutations(string, finalArray)
    };
	if (string.length === 4 && finalArray.length === (string.length * 6) && checkUnique(finalArray)) return finalArray;

    const splitString = string.split('');

    for (let i = splitString.length - 1; i > 0; i--) {
        let randNum = Math.floor(Math.random() * (i + 1));
        let replacement = splitString[i];

        splitString[i] = splitString[randNum];
        splitString[randNum] = replacement;
    };

    finalArray.push(splitString.join(''));

    return permutations(string, finalArray)
};

console.log(permutations('abcd'))