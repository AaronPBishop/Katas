// The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

// Examples

// "din"      =>  "((("
// "recede"   =>  "()()()"
// "Success"  =>  ")())())"
// "(( @"     =>  "))((" 

const duplicateEncode = (word) => {
    let encoded = '';
    const tracker = {};
    const splitWord = word.toLowerCase().split('');

    splitWord.forEach(letter => {
        if (tracker[letter] !== undefined) tracker[letter]++;
        if (tracker[letter] === undefined) tracker[letter] = 1;
    });

    splitWord.forEach(letter => {
        if (tracker[letter] > 1) encoded += ')';
        else encoded += '(';
    });
    
    return encoded;
};