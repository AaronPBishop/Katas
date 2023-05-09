/*
Kata Task

You are given a grid, which always includes exactly two end-points indicated by X

You simply need to return true/false if you can detect a one and only one "valid" line joining those points.

A line can have the following characters :

    - = left / right
    | = up / down
    + = corner

Rules for valid lines

The most basic kind of valid line is when the end-points are already adjacent

X
X

XX

The corner character (+) must be used for all corners (but only for corners).
If you find yourself at a corner then you must turn.
It must be possible to follow the line with no ambiguity (lookahead of just one step, and never treading on the same spot twice).
The line may take any path between the two points.
Sometimes a line may be valid in one direction but not the other. Such a line is still considered valid.
Every line "character" found in the grid must be part of the line. If extras are found then the line is not valid.

Examples

Good lines:

X---------X

X
|
|
X

   +--------+
X--+        +--+
               |
               X

   +-------------+
   |             |
X--+      X------+    

   +-------+
   |      +++---+
X--+      +-+   X

Bad lines:

X-----|----X

X
|
+
X

   |--------+
X---        ---+
               |
               X

   +------ 
   |              
X--+      X  

      +------+
      |      |
X-----+------+
      |
      X

Hint

Imagine yourself walking a path where you can only see your very next step. Can you know which step you must take, or not?
*/

const findStartPoint = (grid) => {
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
         if (grid[i][j] === 'X') return [i, j];
      };
   };
};

const getNeighbors = (grid, currPos) => {
   const [currRow, currCol] = currPos;

   const neighbors = [
      [currRow - 1, currCol],
      [currRow + 1, currCol],
      [currRow, currCol - 1],
      [currRow, currCol + 1]
   ];

   const validNeighbors = [];
   for (let nbr of neighbors) {
      const [nRow, nCol] = nbr;

      if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[0].length) {
         if (grid[nRow][nCol] !== ' ') validNeighbors.push([nRow, nCol]);
      };
   };

   return validNeighbors;
};

const mayConnect = (currEl, nextEl) => {
   const mapConnections = {
      'X': {
         'LEFT': ['-'],
         'RIGHT': ['-'],
         'UP': ['|'],
         'DOWN': ['|']
      },
      '|': {
         'UP': ['|', '+', 'X'],
         'DOWN': ['|', '+', 'X']
      },
      '-': {
         'LEFT': ['-', '+', 'X'],
         'RIGHT': ['-', '+', 'X']
      },
      '+': {
         'LEFT': ['-', '+'],
         'RIGHT': ['-', '+'],
         'UP': ['|', '+'],
         'DOWN': ['|', '+']
      }
   };

   for (let key in mapConnections[currEl]) {
      const currDir = mapConnections[currEl][key];

      for (let line of currDir) {
         if (line === nextEl) return true;
      };
   };

   return false;
};

const line = (grid) => {
   const [startX, startY] = findStartPoint(grid);

   const queue = [[startX, startY]];
   const visited = new Set([`${startX}-${startY}`]);

   while (queue.length) {
      const [currRow, currCol] = queue.shift();

      const neighbors = getNeighbors(grid, [currRow, currCol]);
      if (neighbors.length <= 1 && grid[currRow][currCol] !== 'X') return false;

      for (let nbr of neighbors) {
         const [nRow, nCol] = nbr;
         const coord = `${nRow}-${nCol}`;

         if (!visited.has(coord)) {
            if (!mayConnect(grid[currRow][currCol].toString(), grid[nRow][nCol].toString())) return false;

            queue.push(nbr);
            visited.add(coord);
         };
      };
   };

   return true;
};

const mockGrid1 = [ 
   [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
   [ ' ', ' ', ' ', '+', '-', '-', '-', '-', '-', '-', ' ', ' ', ' ', ' ' ],
   [ ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
   [ 'X', '-', '-', '+', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ' ],
   [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ] 
]

const mockGrid2 = [ 
   [ ' ', ' ', ' ', ' ', ' ' ],
   [ ' ', ' ', 'X', ' ', ' ' ],
   [ ' ', ' ', '|', ' ', ' ' ],
   [ ' ', ' ', '|', ' ', ' ' ],
   [ ' ', ' ', 'X', ' ', ' ' ] 
];

console.log(line(mockGrid1));