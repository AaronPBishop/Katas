// Jon and Joe have received equal marks in the school examination. But, they won't reconcile in peace when equated with each other. To prove his might, Jon challenges Joe to write a program to find all possible number combos that sum to a given number. While unsure whether he would be able to accomplish this feat or not, Joe accepts the challenge. Being Joe's friend, your task is to help him out.
// Task

// Create a function combos, that accepts a single positive integer num (30 > num > 0) and returns an array of arrays of positive integers that sum to num.
// Notes

//     Sub-arrays may or may not have their elements sorted.
//     The order of sub-arrays inside the main array does not matter.
//     For an optimal solution, the following operation should complete within 6000ms.

// Sample
// combos(3) => [ [ 3 ], [ 1, 1, 1 ], [ 1, 2 ] ]

const sumArr = (arr) => arr.reduce((a, b) => a + b, 0);

const setHasArr = (arr, set) => {
    for (const setArr of set) if (arr.toString() === setArr.toString()) return true;

    return false;
};

const combos = (num, i=0, intSet=new Set([])) => {
    if (num < 1) return false;
    if (i === 10) return Array.from(intSet);

    const numArr = [];
    for (let i = 0; i <= num; i++) {
        if (sumArr(numArr) === num && !setHasArr(numArr, intSet)) {
            intSet.add(numArr);

            return combos(num, i += 1, intSet);
        };

        if (sumArr(numArr) > num) return combos(num, i, intSet);
        if (intSet.has(numArr)) return combos(num, i, intSet);

        const randNum = Math.floor(Math.random() * num + 1);

        numArr.push(randNum);
    };

    return combos(num, i, intSet);
};