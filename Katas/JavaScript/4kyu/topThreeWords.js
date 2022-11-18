// Write a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.

// Assumptions:

// A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
// Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
// Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
// Matches should be case-insensitive, and the words in the result should be lowercased.
// Ties may be broken arbitrarily.
// If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.

// Examples:

// top_3_words("In a village of La Mancha, the name of which I have no desire to call to
// mind, there lived not long since one of those gentlemen that keep a lance
// in the lance-rack, an old buckler, a lean hack, and a greyhound for
// coursing. An olla of rather more beef than mutton, a salad on most
// nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
// on Sundays, made away with three-quarters of his income.")
// # => ["a", "of", "on"]

// top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
// # => ["e", "ddd", "aa"]

// top_3_words("  //wont won't won't")
// # => ["won't", "wont"]

const searchObj = (obj, finalArray = []) => {
    let keys = Object.keys(obj);
    let length = keys.length;

    if (length === 1) {
      finalArray.push(keys[0]);
      return finalArray;
    };
  
    if (length <= 3 && finalArray.length === length) return finalArray;
    if (length > 3 && finalArray.length === 3) return finalArray;

    let values = Object.values(obj);
    let highestVal = Math.max(...values);

    for (let key in obj) {
        let val = obj[key];

        if (val === highestVal && finalArray.length < length) {
            finalArray.push(key);
            obj[key] = null;
            break;
        };
    };

    return searchObj(obj, finalArray);
};

const topThreeWords = (text, wordObj = {}) => {
    if (text.length === 0) return searchObj(wordObj);

    let validWord = '';
    const words = text.split(' ').filter(word => word !== '');
    const currWord = words.shift().toLowerCase();
    const letters = currWord.split('');

    while (letters.length > 0) {
        const currLetter = letters.shift();

        if (currLetter.match(/[a-z']/)) validWord += currLetter;
    };

    if (validWord !== '' && validWord.match(/[a-z]/) && wordObj[validWord] !== undefined) wordObj[validWord]++;
    if (validWord !== '' && validWord.match(/[a-z]/) && wordObj[validWord] === undefined) wordObj[validWord] = 1;

    return topThreeWords(words.join(' '), wordObj)
};
