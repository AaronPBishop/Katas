/*
You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return the minimal number of steps to exit position [N-1, N-1] if it is possible to reach the exit from the starting position. Otherwise, return false.

Empty positions are marked .. Walls are marked W. Start and exit positions are guaranteed to be empty in all test cases.
*/

class Finder {
    constructor(currPos, steps) {
        this.currPos = currPos;
        this.steps = steps;
    };
};

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
    
    const queue = [new Finder([0, 0], 0)];
    const visited = new Set([`${0}-${0}`]);

    while (queue.length) {
        const currFinder = queue.shift();
        const [currRow, currCol] = currFinder.currPos;

        if (currRow === grid.length - 1 && currCol === grid[0].length - 1) return currFinder.steps;

        const neighbors = getNeighbors(grid, currFinder.currPos, visited);
        for (let neighbor of neighbors) {
            const [nRow, nCol] = neighbor;
            visited.add(`${nRow}-${nCol}`);

            const newFinder = new Finder(neighbor, currFinder.steps + 1);
            queue.push(newFinder);
        };
    };

    return false;
};