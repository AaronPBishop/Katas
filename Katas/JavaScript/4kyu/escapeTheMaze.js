// You are given the whole maze maze as a 2D grid, more specifically in your language:

// an array of strings

// maze[0][0] is the top left-hand corner

// maze[maze.length - 1][maze[0].length - 1] is the bottom right-hand corner

// Inside this 2D grid:

//     ' ' is some walkable space
//     '#' is a thorn bush (you can't pass through)
//     '^', '<', 'v' or '>' is your sleeping body facing respectively the top, left, bottom or right side of the map.

// Output

// Write the function escape that returns the list/array of moves you need to do relatively to the direction you're facing in order to escape the maze (you won't be able to see the map when you wake up). as an array of the following instructions:

//     'F' move one step forward
//     'L' turn left
//     'R' turn right
//     'B' turn back

//         Note: 'L','R', and 'B' ONLY perform a rotation and will not move your body

// If the maze has no exit, return an empty array.

//     This is a real maze, there is no "escape" point. Just reach the edge of the map and you're free!
//     You don't explicitely HAVE to find the shortest possible route, but you're quite likely to timeout if you don't ;P
//     Aside from having no escape route the mazes will all be valid (they all contain one and only one "body" character and no other characters than the body, "#" and " ". Besides, the map will always be rectangular, you don't have to check that either)

const easyMaze = [ 
    '# ########', 
    '#       >#', 
    '##########' 
];

const hardMaze = [
    '##########',
    '#        #',
    '#  ##### #',
    '#  #   # #',
    '#  #^# # #',
    '#  ### # #',
    '#      # #',
    '######## #'
];

const getPos = (grid) => {
    const symbols = ['<', '>', 'v', '^'];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (symbols.includes(grid[row][col])) return [row, col, grid[row][col]];
        };
    };

    return [];
};

const getNextPos = (currPos, grid, visited) => {
    const [row, col] = currPos;
    const neighbors = {
        'L': [row, col - 1],
        'R': [row, col + 1],
        'U': [row - 1, col],
        'D': [row + 1, col]
    };

    const validMoves = {};
    
    for (let key in neighbors) {
        const [nRow, nCol] = neighbors[key];
        if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[0].length) {
            if (!visited.has(`${nRow}, ${nCol}`) && grid[nRow][nCol] !== '#') validMoves[key] = [nRow, nCol];
        };
    };

    return validMoves;
};

const orientSelf = (currOrientation, finalDirection) => {
    const directions = { 
        '<': {
            'L': ['<', 'F'],
            'R': ['>', 'B'],
            'U': ['^', 'R'],
            'D': ['v', 'L']
        },
        '>': {
            'L': ['<', 'B'],
            'R': ['>', 'F'],
            'U': ['^', 'L'],
            'D': ['v', 'R']
        },
        '^': {
            'L': ['<', 'L'],
            'R': ['>', 'R'],
            'U': ['^', 'F'],
            'D': ['v', 'B']
        },
        'v': {
            'L': ['<', 'R'],
            'R': ['>', 'L'],
            'U': ['^', 'B'],
            'D': ['v', 'F']
        }
    };

    return directions[currOrientation][finalDirection];
}

const escapeFinder = (maze) => {
    const grid = [];
    for (let str of maze) grid.push(str.split(''));

    const moves = [];
    const visited = new Set([]);

    let foundEnd = false;
    while (!foundEnd) {
        const [currRow, currCol, currOrientation] = getPos(grid);
        const nextPos = getNextPos([currRow, currCol], grid, visited);

        if (!Object.keys(nextPos).length) {
            foundEnd = true;
            break;
        };

        for (let key in nextPos) {
            const [nextRow, nextCol] = nextPos[key];
            const [newOrientation, move] = orientSelf(currOrientation, key);

            if (move === 'F') {
                grid[nextRow][nextCol] = newOrientation;
                grid[currRow][currCol] = ' ';

                moves.push('F');
                visited.add(`${currRow}, ${currCol}`);
                visited.add(`${nextRow}, ${nextCol}`);
            };

            if (move !== 'F') {
                grid[currRow][currCol] = newOrientation;

                moves.push(move);
            };
        };
    };

    return moves;
};
// rename function 'escape' to pass tests
console.log(escapeFinder(hardMaze))