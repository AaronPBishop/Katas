/*
    Given an list arr of strings, return true if all strings in arr are anagrams of each other, and false otherwise. 
    An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the orignal letters exactly once. 
*/

const createObj = (word) => {
    const letters = {};

    word.split('').forEach(ltr => {
        if (letters[ltr]) letters[ltr]++;
        if (!letters[ltr]) letters[ltr] = 1;
    });

    return letters;
};

const checkWord = (w1, w2) => {
    if (Object.keys(w1).length !== Object.keys(w2).length) return false;

    for (let key in w1) {
        if (!w2[key]) return false;
        if (w1[key] !== w2[key]) return false;
    };

    return true;
};

const is_anagrams = (arr) => {
    if (arr.length === 1) return true;

    const words = [];

    for (let word of arr) words.push(createObj(word));

    for (let i = 0; i < words.length; i++) {
        const firstWord = words[0];

        if (!checkWord(firstWord, words[i])) return false;
    };

    return true;
};