// Given a sequence of numbers, find the largest pair sum in the sequence.

// For example

// [10, 14, 2, 23, 19] -->  42 (= 23 + 19)
// [99, 2, 2, 23, 19]  --> 122 (= 99 + 23)

// Input sequence contains minimum two elements and every element is an integer.


// Iterative solution

// const largestPairSum = (arr) => {
//     let count = 2;
//     let sum = 0;

//     while (count > 0) {
//         let largestVal = Math.max(...arr);
//         let largestIndex = arr.indexOf(largestVal);

//         sum += largestVal;
//         arr.splice(largestIndex, 1);
//         count--;
//     };
    
//     return sum;
// };


// Recursive solution

const largestPairSum = (arr, count = 2, sum = 0) => {
    if (count === 0) return sum;

    let largestVal = Math.max(...arr);
    let largestIndex = arr.indexOf(largestVal);

    arr.splice(largestIndex, 1);

    return largestPairSum(arr, count - 1, sum += largestVal);
};

// const arr1 = [10, 14, 2, 23, 19]; // 42
// const arr2 = [99, 2, 2, 23, 19];  // 122

// console.log(largestPairSum(arr2));