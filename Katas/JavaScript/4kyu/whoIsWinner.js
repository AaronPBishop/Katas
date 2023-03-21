// The grid is 6 row by 7 columns, those being named from A to G.

// You will receive a list of strings showing the order of the pieces which dropped in columns:

// The list may contain up to 42 moves and shows the order the players are playing.

// The first player who connects four items of the same color is the winner.

// You should return "Yellow", "Red" or "Draw" accordingly.

const mockBoard = [
    "C_Yellow",
    "E_Red",
    "G_Yellow",
    "B_Red",
    "D_Yellow",
    "B_Red",
    "B_Yellow",
    "G_Red",
    "C_Yellow",
    "C_Red",
    "D_Yellow",
    "F_Red",
    "E_Yellow",
    "A_Red",
    "A_Yellow",
    "G_Red",
    "A_Yellow",
    "F_Red",
    "F_Yellow",
    "D_Red",
    "B_Yellow",
    "E_Red",
    "D_Yellow",
    "A_Red",
    "G_Yellow",
    "D_Red",
    "D_Yellow",
    "C_Red"
];

const constructBoard = (positions) => {
    const board = [];
    const mapColumns = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6 };

    for (let i = 0; i < 7; i++) board.push([]);
    for (let move of positions) {
        const [column, color] = move.split('_');
        board[mapColumns[column]].push(color);
    };

    for (let column of board) while (column.length < 6) column.unshift(null);

    return board;
};

const checkColumns = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let currColor;
            if (board[i][j]) currColor = board[i][j];

            if (currColor) {
                let check = 0;
                for (let y = j; y < board[i].length; y++) {
                    if (board[i][y] === currColor) check++;
                };

                if (check === 4) return currColor;
            };
        };
    };

    return false;
};

const checkRows = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const currVal = board[i][j];
            if (currVal) {
                if ((board[i + 1]) && (board[i + 2]) && (board[i + 3])) {
                    if ((board[i + 1][j] === currVal) && (board[i + 2][j] === currVal) && (board[i + 3][j] === currVal)) return currVal;
                };
            };
        };
    };

    return false;
};

const checkDiagonals = (board) => {
    for (let row = 0; row <= board.length - 4; row++) {
        for (let col = 0; col <= board[row].length - 4; col++) {
            if (
                board[row][col] &&
                board[row][col] === board[row + 1][col + 1] &&
                board[row][col] === board[row + 2][col + 2] &&
                board[row][col] === board[row + 3][col + 3]
            ) return board[row][col];
        };
    };
    
    for (let row = 0; row <= board.length - 4; row++) {
        for (let col = board[row].length - 1; col >= 3; col--) {
            if (
                board[row][col] &&
                board[row][col] === board[row + 1][col - 1] &&
                board[row][col] === board[row + 2][col - 2] &&
                board[row][col] === board[row + 3][col - 3]
            ) return board[row][col];
        };
    };

    return false;
};

const whoIsWinner = (piecesPositionList) => {
    const board = constructBoard(piecesPositionList);
    if (checkDiagonals(board)) return checkDiagonals(board);
    if (checkColumns(board)) return checkColumns(board);
    if (checkRows(board)) return checkRows(board);

    return 'Draw';
};