// Write a function that accepts a string, and returns true if it is in the form of a phone number.
// Assume that any integer from 0-9 in any of the spots will produce a valid phone number.

// Only worry about the following format:
// (123) 456-7890 (don't forget the space after the close parentheses)

// Examples:

// "(123) 456-7890"  => true
// "(1111)555 2345"  => false
// "(098) 123 4567"  => false

const validPhoneNumber = (phoneNumber) => {
    numberArr = phoneNumber.split('');
    let boolean = false;
    let check = 0;

    for (let i = 0; i < numberArr.length; i++) {
        let currentElement = numberArr[i];
        if (currentElement === '(' && i === 0) check++;
        if (currentElement === ')' && i === 4) check++;
        if (currentElement === '-' && i === 9) check++;
    };

    if (check === 3) boolean = true;

    return boolean;
};

console.log(validPhoneNumber("(123) 456-7890"));
console.log(validPhoneNumber("(1111)555 2345"));
console.log(validPhoneNumber("(098) 123 4567"));