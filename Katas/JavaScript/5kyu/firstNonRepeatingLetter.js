// Write a function named first_non_repeating_letter that takes a string input, and returns the first character that is not repeated anywhere in the string.

// For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.

// As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.

// If a string contains all repeating characters, it should return an empty string ("") or None -- see sample tests.


const firstNonRepeatingLetter = (string) => {
    const letters = {};
    string.split('')
          .forEach(letter => {
                letter = letter.toLowerCase();
                if (letters[letter] !== undefined) letters[letter]++;
                if (letters[letter] === undefined) letters[letter] = 1;
            });
    
    for (let key in letters) {
        let val = letters[key];

        if (val === 1) {
            const findIt = string.split('').find(letter => key.toUpperCase() === letter);
            return findIt || key;
        };
    };

    return '';
};