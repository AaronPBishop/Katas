// The first input array is the key to the correct answers to an exam, like ["a", "a", "b", "d"]. The second one contains a student's submitted answers.

// The two arrays are not empty and are the same length. Return the score for this array of answers, giving +4 for each correct answer, -1 for each incorrect answer, and +0 for each blank answer, represented as an empty string (in C the space character is used).

// If the score < 0, return 0.

// For example:

// checkExam(["a", "a", "b", "b"], ["a", "c", "b", "d"]) → 6
// checkExam(["a", "a", "c", "b"], ["a", "a", "b",  ""]) → 7
// checkExam(["a", "a", "b", "c"], ["a", "a", "b", "c"]) → 16
// checkExam(["b", "c", "b", "a"], ["",  "a", "a", "c"]) → 0



const checkExam = (array1, array2, score = 0) => {
    if (array1.length === 0) return score;
    if (score < 0) return 0;

    let currAns = array1.shift();
    let correctAns = array2.shift();

    if (currAns === "" || correctAns === "") {
        score += 0;
        return checkExam(array1, array2, score);
    };
    
    if (currAns === correctAns) score += 4;
    if (currAns !== correctAns) score -= 1;
    

    return checkExam(array1, array2, score);
};

// const exam1 = ["a", "a", "b", "b"] // → 6
// const exam2 = ["a", "a", "c", "b"] // → 7
// const exam3 = ["a", "a", "b", "c"] // → 16
// const exam4 = ["b", "c", "b", "a"] // → 0

// const answers1 = ["a", "c", "b", "d"];
// const answers2 = ["a", "a", "b",  ""];
// const answers3 = ["a", "a", "b", "c"];
// const answers4 = ["",  "a", "a", "c"];

// console.log(checkExam(exam1, answers1));