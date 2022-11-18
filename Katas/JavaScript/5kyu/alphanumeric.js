// In this example you have to validate if a user input string is alphanumeric. The given string is not nil/null/NULL/None, so you don't have to check that.

// The string has the following conditions to be alphanumeric:

// At least one character ("" is not valid)
// Allowed characters are uppercase / lowercase latin letters and digits from 0 to 9
// No whitespaces / underscore

const alphanumeric = (string, i = 0) => {
    if (string.length === 0 && i === 0) return false;
    if (string.length === 0) return true;

    let splitString = string.split('');
    let currEl = splitString.shift();

    if (!currEl.match(/[0-9a-zA-Z]/)) return false;

    return alphanumeric(splitString.join(''), i += 1);
};