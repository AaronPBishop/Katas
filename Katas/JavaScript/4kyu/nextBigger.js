// Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:

//   12 ==> 21
//  513 ==> 531
// 2017 ==> 2071

// If the digits can't be rearranged to form a bigger number, return -1 (or nil in Swift, None in Rust):

//   9 ==> -1
// 111 ==> -1
// 531 ==> -1

const nextBigger = (num) => {
    const splitNum = num.toString().split('');

    if (splitNum.length <= 1 || new Set(splitNum).size === 1) return -1;

    for (let i = splitNum.length - 1; i >= 0; i--) {
        if (splitNum[i] < splitNum[i + 1]) {
            const smallestFromRight = splitNum.slice(i + 1).sort().find(n => n > splitNum[i]);
            const pivotIndex = splitNum.indexOf(smallestFromRight, i + 1);

            [splitNum[i], splitNum[pivotIndex]] = [splitNum[pivotIndex], splitNum[i]];

            const sortedRightSide = splitNum.splice(i + 1).sort();
            return Number([...splitNum, ...sortedRightSide].join(''));
        };
    };

    return -1;
};