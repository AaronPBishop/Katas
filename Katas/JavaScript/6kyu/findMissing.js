// An Arithmetic Progression is defined as one in which there is a constant difference between the consecutive terms of a given series of numbers. 

// You are provided with consecutive elements of an Arithmetic Progression. 

// There is however one hitch: exactly one term from the original series is missing from the set of numbers which have been given to you. The rest of the given series is the same as the original AP. Find the missing term.

// You have to write a function that receives a list, list size will always be at least 3 numbers. The missing term will never be the first or last one.

// Example:

// findMissing([1, 3, 5, 9, 11]) == 7

const findSteps = (arr) => {
    let currStep = Infinity;

    for (let i = 0; i < arr.length; i++) {
        let currNum = arr[i];
        let nextNum = arr[i + 1];

        if (currNum - nextNum < currStep) currStep = Math.abs(currNum - nextNum);
    };

    return currStep;
};

const fillArray = (arr) => {
    let step = findSteps(arr);

    let start = arr[0];
    let end = arr[arr.length - 1];

    let filledArray = [];
    for (let i = start; i <= end; i += step) {
        filledArray.push(i);
    };

    return filledArray;
};

const findMissing = (sequence) => {
    let fullSequence = fillArray(sequence);
    let missing;

    for (let i = 0; i < fullSequence.length; i++) {
        let currNum = fullSequence[i];

        if (!sequence.includes(currNum)) missing = currNum;
    };

    return missing;
};