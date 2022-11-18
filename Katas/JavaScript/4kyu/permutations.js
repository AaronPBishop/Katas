// In this kata you have to create all permutations of a non empty input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

// Examples:

// * With input 'a'
// * Your function should return: ['a']
// * With input 'ab'
// * Your function should return ['ab', 'ba']
// * With input 'aabb'
// * Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']

// The order of the permutations doesn't matter.

const hasDuplicates = (str) => {
    const letters = {};
    str.split('').forEach(letter => {
        if (letters[letter] !== undefined) letters[letter]++;
        if (letters[letter] === undefined) letters[letter] = 1;
    });

    for (let key in letters) if (letters[key] > 1) return letters;

    return false;
};

const numPermutations = (str) => {
    if (hasDuplicates(str) === false) {
        let multiplier = 1;

        for (let i = 1; i <= str.length; i++);

        return multiplier;
    };

    const letters = hasDuplicates(str);
    let multiplier = 1;
    let divisor = 1;
    let visited = new Set();

    for (let i = 1; i <= str.length; i++) {
        let currLetter = str[i];

        if (letters[currLetter] > 1 && !visited.has(currLetter)) {
            for (let j = 1; j <= letters[currLetter]; j++) divisor *= j;
            visited.add(currLetter);
        };

        multiplier *= i;
    };

    return (multiplier / divisor);
};

const permutations = (string, finalArray = [], i = 0, visited = new Set()) => {
    if (string.length === 2) {
        if (string.split('')[0] === string.split('')[1]) {
            finalArray.push(string);
            return finalArray;
        };
    };

	if (string.length <= 2 && finalArray.length === string.length) return finalArray;

    const maxPermutations = numPermutations(string);
    if (i === maxPermutations) return finalArray;

    const splitString = string.split('');

    for (let i = splitString.length - 1; i > 0; i--) {
        let randNum = Math.floor(Math.random() * (i + 1));
        let replacement = splitString[i];

        splitString[i] = splitString[randNum];
        splitString[randNum] = replacement;
    };

    if (!visited.has(splitString.join(''))) {
        finalArray.push(splitString.join(''));
        visited.add(splitString.join(''));

        return permutations(string, finalArray, i += 1, visited);
    };

    return permutations(string, finalArray, i, visited);
};

// Alternate method

// const permutes = (string) => {
//     var s = string.split('').sort();
//     var res = [s.join('')]
//     while(true) {
    
//       var j = s.length - 2;
//       while (j != -1 && s[j] >= s[j + 1])
//         j--;
//       if(j == -1)
//         break;
        
//       var k = s.length - 1;
//       while(s[j] >= s[k])
//         k--;
      
//       [s[j], s[k]] = [s[k], s[j]];
//       var l = j + 1, r = s.length - 1;
//       while (l<r) {
//         [s[l], s[r]] = [s[r], s[l]];
//         l++;
//         r--;
//       }
//       res.push(s.join(''));
//     }
//     return res;
// }