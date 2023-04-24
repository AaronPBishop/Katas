/*
You are at start location [0, 0] in mountain area of NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return minimal number of climb rounds to target location [N-1, N-1]. Number of climb rounds between adjacent locations is defined as difference of location altitudes (ascending or descending).

Location altitude is defined as an integer number (0-9).
*/

const getNeighbors = (grid, currPos) => {
    const [row, col] = currPos;
    const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1]
    ];

    return neighbors.filter(neighbor => {
        const [nRow, nCol] = neighbor;

        if (grid[nRow] !== undefined && grid[nRow][nCol] !== undefined) return neighbor;
    });
};

const pathFinder = (area) => {
    const grid = [[]];
    area.split('').forEach(el => el === '\n' ? grid.push([]) : grid[grid.length - 1].push(Number(el)));

    const distances = {};
    const queue = [{ pos: [0, 0], sum: 0 }];
    const visited = new Set([`${0}-${0}`]);

    while (queue.length) {
        const { pos, sum } = queue.shift();
        const [row, col] = pos;
        const key = `${row}-${col}`;

        distances[key] = sum;

        const neighbors = getNeighbors(grid, pos);
        for (let neighbor of neighbors) {
            const [nRow, nCol] = neighbor;
            const nKey = `${nRow}-${nCol}`;

            if (!visited.has(nKey)) {
                visited.add(nKey);
                queue.push({ pos: neighbor, sum: sum + Math.abs(grid[row][col] - grid[nRow][nCol])});
            };
        };
    };

    return distances[`${grid.length - 1}-${grid.length - 1}`];
};

const testArea = 
`010
101
010`; // 4

console.log(pathFinder(testArea));