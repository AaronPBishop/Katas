// If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is solved, wouldn't we? Our goal is to create a function that will check that for us!

// Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:

// [[0, 0, 1],
//  [0, 1, 2],
//  [2, 1, 0]]

// We want our function to return:

//     -1 if the board is not yet finished AND no one has won yet (there are empty spots),
//     1 if "X" won,
//     2 if "O" won,
//     0 if it's a cat's game (i.e. a draw).

// You may assume that the board passed in is valid in the context of a game of Tic-Tac-Toe.

const isSolved = (board) => {
    const rows = { r0: [], r1: [], r2: [] };
    const cols = { c0: [], c1: [], c2: [] };
    for (let row = 0; row < board.length; row++) {
        let currRow = `r${row}`;

        for (let col = 0; col < board[row].length; col++) {
            let currCol = `c${col}`;

            rows[currRow].push(board[row][col]);
            cols[currCol].push(board[row][col]);
        };
    };
    
    const rowVals = Object.values(rows);
    const colVals = Object.values(cols);

    let isTie = true;
    for (let row = 0; row < rowVals.length; row++) {
        let currRow = rowVals[row];
        if (currRow.includes(0)) isTie = false;

        let rowTotal = 0;
        currRow.forEach(val => rowTotal += Number(val));
        if (rowTotal === 3 && !currRow.includes(0)) return 1;
        if (rowTotal === 6 && !currRow.includes(0)) return 2;
    };

    for (let col = 0; col < colVals.length; col++) {
        let currCol = colVals[col];
        if (currCol.includes(0)) isTie = false;

        let colTotal = 0;
        currCol.forEach(val => colTotal += Number(val));
        if (colTotal === 3 && !currCol.includes(0)) return 1;
        if (colTotal === 6 && !currCol.includes(0)) return 2;
    };
    
    if (isTie) return 0;
    return -1;
};

let newBoard = [[0, 0, 1], [0, 1, 2], [2, 1, 0]];
console.log(isSolved(newBoard));