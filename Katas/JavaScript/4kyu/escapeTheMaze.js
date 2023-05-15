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

class Traveler {
    constructor(currOrientation, currPos, moves=[]) {
        this.currOrientation = currOrientation;
        this.currPos = currPos;
        this.moves = moves;
    };
};

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

const getStartingPos = (grid) => {
    const symbols = ['<', '>', '^', 'v'];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (symbols.includes(grid[i][j])) return { orientation: grid[i][j], coord: [i, j] };
        };
    };

    return;
};

const getNeighbors = (grid, currPos, visited) => {
    const [currRow, currCol] = currPos;

    const neighbors = [
        [currRow - 1, currCol],
        [currRow + 1, currCol],
        [currRow, currCol - 1],
        [currRow, currCol + 1]
    ];

    const validNeighbors = [];
    for (let neighbor of neighbors) {
        const [nRow, nCol] = neighbor;

        if ((nRow >= 0 && nRow < grid.length) && (nCol >= 0 && nCol < grid[0].length)) {
            if (grid[nRow][nCol] !== '#' && !visited.has(`${nRow}-${nCol}`)) validNeighbors.push([nRow, nCol]);
        };
    };

    return validNeighbors;
};

const getNextDirection = (currPos, nextPos) => {
    const [currRow, currCol] = currPos;
    const [nextRow, nextCol] = nextPos;

    if (nextRow < currRow && nextCol === currCol) return 'UP';
    if (nextRow > currRow && nextCol === currCol) return 'DOWN';
    if (nextRow === currRow && nextCol < currCol) return 'LEFT';
    if (nextRow === currRow && nextCol > currCol) return 'RIGHT';
};

const getNextMove = (currOrientation, currPos, nextPos) => {
    const nextDir = getNextDirection(currPos, nextPos);

    const mapMoves = {
        '^': {
            'UP': ['F', '^'],
            'DOWN': ['B', 'v'],
            'LEFT': ['L', '<'],
            'RIGHT': ['R', '>']
        },
        'v': {
            'UP': ['B', '^'],
            'DOWN': ['F', 'v'],
            'LEFT': ['R', '<'],
            'RIGHT': ['L', '>']
        },
        '<': {
            'UP': ['R', '^'],
            'DOWN': ['L', 'v'],
            'LEFT': ['F', '<'],
            'RIGHT': ['B', '>']
        },
        '>': {
            'UP': ['L', '^'],
            'DOWN': ['R', 'v'],
            'LEFT': ['B', '<'],
            'RIGHT': ['F', '>']
        }
    };

    return { move: mapMoves[currOrientation][nextDir][0], orientation: mapMoves[currOrientation][nextDir][1] };
};

const hasEscaped = (currPos, escapeCoords) => {
    const [currRow, currCol] = currPos;
    for (let coord of escapeCoords) {
        const [cRow, cCol] = coord;
        if (currRow === cRow && currCol === cCol) return true;
    };

    return false;
};

const escapeMaze = (maze) => {
    const grid = maze.map(row => row.split(''));
    const startingPos = getStartingPos(grid);

    const canEscape = isPossible(grid);
    if (!canEscape.isValid) return [];
    
    const startingNode = new Traveler(startingPos.orientation, startingPos.coord);

    const queue = [startingNode];
    const visited = new Set([`${startingPos.coord[0]}-${startingPos.coord[1]}`]);

    while (queue.length) {
        const currNode = queue.shift();

        if (hasEscaped(currNode.currPos, canEscape.escapeCoords)) return currNode.moves;

        const neighbors = getNeighbors(grid, currNode.currPos, visited);
        for (let neighbor of neighbors) {
            const [nRow, nCol] = neighbor;
            visited.add(`${nRow}-${nCol}`);

            const nextMove = getNextMove(currNode.currOrientation, currNode.currPos, neighbor);

            if (nextMove.move !== 'F') {
                const newNode = new Traveler(nextMove.orientation, neighbor, [...currNode.moves, nextMove.move]);
                newNode.moves.push('F');

                queue.push(newNode);
                
                continue;
            };

            const newNode = new Traveler(nextMove.orientation, neighbor, [...currNode.moves, nextMove.move]);
            queue.push(newNode);
        };
    };

    return [];
};