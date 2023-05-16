/*
You are at start location [0, 0] in mountain area of NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return minimal number of climb rounds to target location [N-1, N-1]. Number of climb rounds between adjacent locations is defined as difference of location altitudes (ascending or descending).

Location altitude is defined as an integer number (0-9).
*/

const getNeighbors = (grid, pos, distances) => {
    const [row, col] = pos;
    return [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1]
    ].filter(neighbor => {
        const [nRow, nCol] = neighbor;
        return (
            (nRow >= 0 && nRow < grid.length) &&
            (nCol >= 0 && nCol < grid[0].length) &&
            grid[nRow][nCol] !== Infinity &&
            distances[nRow][nCol] > distances[row][col] + Math.abs(grid[row][col] - grid[nRow][nCol])
        );
    });
};

const pathFinder = (area) => {
    const grid = [[]];
    const distances = [[]];

    area.split('').forEach(el => 
        el === '\n' ? (grid.push([]) && distances.push([])) : 
        (grid[grid.length - 1].push(Number(el)) && distances[distances.length - 1].push(Infinity))
    );
    distances[0][0] = 0;
    
    const queue = [[0, 0]];
    while (queue.length) {
        const [row, col] = queue.shift();
    
        const neighbors = getNeighbors(grid, [row, col], distances);
        for (const neighbor of neighbors) {
            const [nRow, nCol] = neighbor;

            distances[nRow][nCol] = distances[row][col] + Math.abs(grid[row][col] - grid[nRow][nCol]);
            queue.push([nRow, nCol]);
        };
    };
    
    return distances[grid.length - 1][grid[0].length - 1];
};