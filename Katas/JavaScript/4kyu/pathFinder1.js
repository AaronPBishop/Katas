/*
You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return true if you can reach position [N-1, N-1] or false otherwise.

    Empty positions are marked ..
    Walls are marked W.
    Start and exit positions are empty in all test cases.
*/

const getNeighbors = (grid, currPos, visited) => {
    const [row, col] = currPos;
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
            !visited.has(`${nRow}-${nCol}`) &&
            grid[nRow][nCol] !== 'W'
        );
    });
};

const pathFinder = (maze) => {
    const grid = [[]];
    maze.split('').forEach(el => el === '\n' ? grid.push([]) : grid[grid.length - 1].push(el));
    
    const queue = [[0, 0]];
    const visited = new Set([`${0}-${0}`]);

    while (queue.length) {
        const currPos = queue.shift();
        const [currRow, currCol] = currPos;

        if (currRow === grid.length - 1 && currCol === grid[0].length - 1) return true;

        const neighbors = getNeighbors(grid, currPos, visited);
        for (let neighbor of neighbors) {
            const [nRow, nCol] = neighbor;

            visited.add(`${nRow}-${nCol}`);
            queue.push(neighbor);
        };
    };

    return false;
};