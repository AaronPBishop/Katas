/*
You are at start location [0, 0] in mountain area of NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return minimal number of climb rounds to target location [N-1, N-1]. Number of climb rounds between adjacent locations is defined as difference of location altitudes (ascending or descending).

Location altitude is defined as an integer number (0-9).
*/

const pathFinder = (area) => {
    const grid = [[]];
    area.split('').forEach(el => el === '\n' ? grid.push([]) : grid[grid.length - 1].push(el));

    return grid;
};

const testArea = 
`010
101
010`; // 4

console.log(pathFinder(testArea))