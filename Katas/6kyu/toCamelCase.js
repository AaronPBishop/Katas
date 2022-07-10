// Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case).
// Examples

// "the-stealth-warrior" gets converted to "theStealthWarrior"
// "The_Stealth_Warrior" gets converted to "TheStealthWarrior"


const toCamelCase = (str, finalArray = []) => {
    if (str.length === 0) return finalArray.join('');

    let splitString = str.split('');
    let currentElement = splitString.shift();

    if (currentElement === '-' || currentElement === '_') {
        let nextElement = splitString.shift();
        finalArray.push(nextElement.toUpperCase());
    } else {
        finalArray.push(currentElement);
    };

    return toCamelCase(splitString.join(''), finalArray);
};

console.log(toCamelCase("the-stealth-warrior"));
console.log(toCamelCase("The_Stealth_Warrior"));