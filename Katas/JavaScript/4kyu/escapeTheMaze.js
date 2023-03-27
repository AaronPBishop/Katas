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

const insaneMaze = [
    "#########################################",
    "#<    #       #     #         # #   #   #",
    "##### # ##### # ### # # ##### # # # ### #",
    "# #   #   #   #   #   # #     #   #   # #",
    "# # # ### # ########### # ####### # # # #",
    "#   #   # # #       #   # #   #   # #   #",
    "####### # # # ##### # ### # # # #########",
    "#   #     # #     # #   #   # # #       #",
    "# # ####### ### ### ##### ### # ####### #",
    "# #             #   #     #   #   #   # #",
    "# ############### ### ##### ##### # # # #",
    "#               #     #   #   #   # #   #",
    "##### ####### # ######### # # # ### #####",
    "#   # #   #   # #         # # # #       #",
    "# # # # # # ### # # ####### # # ### ### #",
    "# # #   # # #     #   #     # #     #   #",
    "# # ##### # # ####### # ##### ####### # #",
    "# #     # # # #   # # #     # #       # #",
    "# ##### ### # ### # # ##### # # ### ### #",
    "#     #     #     #   #     #   #   #    ",
    "#########################################"
];

const isPossible = (grid) => {
    const escapeCoords = [];

    let validTopRow = false;
    let validBottomRow = false;
    let validLeftSide = false;
    let validRightSide = false;

    for (let i = 0; i < grid[0].length; i++) {
        const topRow = grid[0][i];
        const bottomRow = grid[grid.length - 1][i];

        if (topRow === ' ') {
            validTopRow = true;
            escapeCoords.push([0, i]);
        };

        if (bottomRow === ' ') {
            validBottomRow = true;
            escapeCoords.push([grid.length - 1, i]);
        };
    };

    for (let i = 0; i < grid.length; i++) {
        const leftSide = grid[i][0];
        const rightSide = grid[i][grid[i].length - 1];

        if (leftSide === ' ') {
            validLeftSide = true;
            escapeCoords.push([i, 0])
        };

        if (rightSide === ' ') {
            validRightSide = true;
            escapeCoords.push([i, grid[i].length - 1]);
        };
    };

    if (validTopRow || validBottomRow || validLeftSide || validRightSide) return { isValid: true, escapeCoords };
    return { isValid: false, escapeCoords };
};

const getPos = (grid) => {
    const symbols = ['<', '>', 'v', '^'];

    const positions = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (symbols.includes(grid[row][col])) positions.push([row, col, grid[row][col]]);
        };
    };

    return positions;
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
};

const escapeFinder = (maze) => {
    const grid = [];
    for (let str of maze) grid.push(str.split(''));

    const canEscape = isPossible(grid);
    if (!canEscape.isValid) return [];

    const visited = new Set([]);

    let numPositions = 1;
    const nodes = { startingNode: [] };

    let foundEnd = false;
    while (!foundEnd) {
        const positions = getPos(grid);

        for (let pos of positions) {
            const [currRow, currCol, currOrientation] = pos;

            if (positions.length > numPositions) {
                if (!nodes[`node${currRow}${currCol}`]) nodes[`node${currRow}${currCol}`] = [ ...nodes.startingNode ];
                numPositions++;
            };

            const nextPos = getNextPos([currRow, currCol], grid, visited);

            for (let key in nextPos) {
                const [nextRow, nextCol] = nextPos[key];
                const [newOrientation, move] = orientSelf(currOrientation, key);

                grid[nextRow][nextCol] = newOrientation;
                grid[currRow][currCol] = ' ';

                for (let key in nodes) {
                    if (move === 'F') {nodes[key].push('F');}
                    if (move !== 'F') {
                        nodes[key].push(move);
                        nodes[key].push('F');
                    };

                    visited.add(`${currRow}, ${currCol}`);

                    for (let coord of canEscape.escapeCoords) {
                        const [escapeRow, escapeCol] = coord;
                        if (nextRow === escapeRow && nextCol === escapeCol) {
                            foundEnd = true;
                            return nodes[key]
                        };
                    };
                };
            };
        };
    };

    return nodes;
};
// rename function 'escape' to pass tests
console.log(escapeFinder(hardMaze));