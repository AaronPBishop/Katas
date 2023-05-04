/*
You are at start location [0, 0] in mountain area of NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return minimal number of climb rounds to target location [N-1, N-1]. Number of climb rounds between adjacent locations is defined as difference of location altitudes (ascending or descending).

Location altitude is defined as an integer number (0-9).
*/

const getNeighbors = (grid, currPos, currVal) => {
    const [row, col] = currPos;
    const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1]
    ];

    const validNeighbors = [];
    for (let neighbor of neighbors) {
        const [nRow, nCol] = neighbor;

        if (grid[nRow] !== undefined && grid[nRow][nCol] !== undefined) {
            validNeighbors.push({ neighbor, diff: Math.abs(currVal - grid[nRow][nCol]) })
        };
    };

    let sum = Infinity;
    let bestN = null;
    for (let neighbor of validNeighbors) {
        const val = neighbor.diff;

        if (val < sum) {
            sum = val;
            bestN = neighbor.neighbor;
        }
    };

    return bestN;
};

const pathFinder = (area) => {
    const grid = [[]];
    area.split('').forEach(el => el === '\n' ? grid.push([]) : grid[grid.length - 1].push(Number(el)));

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const currVal = grid[i][j];
            console.log(getNeighbors(grid, [i, j], currVal))
        };
    };

    return;
};

const testArea = 
`777000
007000
007000
007000
007000
007777`; // 0

console.log(pathFinder(testArea));