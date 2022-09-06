/* 
There are 15 arrays that each contain the digits of separate credit card numbers. They all have prefixes to reflect their status, i.e. variables that start with valid contain a valid number, whereas invalid do not, and mystery variables can be either. There is also a batch array that stores all of the provided credit cards in a single array.

Create a function, validateCred() that has a parameter of an array. The purpose of validateCred() is to return true when an array contains digits of a valid credit card number and false when it is invalid. This function should NOT mutate the values of the original array.

To find out if a credit card number is valid or not, use the Luhn algorithm:

    Starting from the farthest digit to the right, AKA the check digit, iterate to the left.

    As you iterate to the left, every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after doubling, subtract 9 from its value.

    Sum up all the digits in the credit card number.
    If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.

Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.

After finding all the invalid credit card numbers, it’s also necessary to identify the credit card companies that have possibly issued these faulty numbers. Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers and returns an array of companies.

Currently, there 4 accepted companies which each have unique first digits. The following table shows which digit is unique to which company:

    First Digit 	Company

    3 	            Amex (American Express)
    4 	            Visa
    5 	            Mastercard
    6 	            Discover

idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers. This array should NOT contain duplicates, i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array. 
*/

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];
const validBatch = [valid1, valid2, valid3, valid4, valid5];
const invalidBatch = [invalid1, invalid2, invalid3, invalid4, invalid5];
const mysteryBatch = [mystery1, mystery2, mystery3, mystery4, mystery5];


const validateCred = (arr) => {
    let copy = [...arr]

    let tracker = 1;
    for (let i = copy.length - 1; i >= 0; i--) {
        if (tracker > 1 && tracker % 2 === 0) {
            copy[i] = (copy[i] * 2);

            if (copy[i] > 9) copy[i] -= 9;
        };
        tracker++;
    };

    let sum = 0;
    copy.forEach(val => sum += val);

    if (sum % 10 === 0) return true;
    return false;
};

const findInvalidCards = (arr) => {
    const invalidCards = [];

    arr.forEach(sub => { if (!validateCred(sub)) invalidCards.push(sub) });

    return invalidCards;
};

const idInvalidCardCompanies = (arr) => {
    const invalidCards = findInvalidCards(arr);
    const issuers = [];
    const identifier = { 'Amex': 3, 'Visa': 4, 'MasterCard': 5, 'Discover': 6 };
    const values = Object.values(identifier);

    invalidCards.forEach(card => {
        if (values.includes(card[0])) {
            for (let key in identifier) {
                let val = identifier[key];

                if (val === card[0] && !issuers.includes(key)) issuers.push(key);
            };
        };
    });

    if (issuers.length === 0) return 'No companies found.';
    return issuers;
};