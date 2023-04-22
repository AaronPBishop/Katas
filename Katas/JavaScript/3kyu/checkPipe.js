/*
The goal of this kata is to check whether a network of water pipes is leaking anywhere.
Task

Create a function which accepts a map input and validates if water is leaking anywhere. In case water is leaking return false. In case the pipe network is correct -- i.e. there are no leaks anywhere -- return true.

There can be multiple water sources. All pipes which are directed outside of the map are connected to a water source, and you need to check them for leaks.

For example, in the map below:

     ╋━━┓
     ┃..┃
     ┛..┣
     
The water sources (marked with +) are:           
     +
   + ╋━━┓
     ┃..┃
   + ┛..┣ +
        +

This map shows a correct pipe network. It's not leaking anywhere.

A leaking pipeline example :

The leak is marked by the arrow pointing to the top left-hand corner of the map:

 --> ...┏ +
     ┃..┃
   + ┛..┣ +
        +

A leak may involve a pipe pointing to an empty cell in the map, like this: ━━.. It may also involve a pipe pointing to another pipe that does not point back, like this: ━━┗

There can be also 'old pipes` on the map which are not connected to water sources. You should ignore such pipes.
*/

// Add 'validConnections'
const mapPipes = (pipe) => {
  const pipes = {
    '┗': { inputs: ['UP', 'RIGHT'] },
    '┓': { inputs: ['LEFT', 'DOWN'] },
    '┏': { inputs: ['RIGHT', 'DOWN'] },
    '┛': { inputs: ['LEFT', 'UP'] },
    '━': { inputs: ['LEFT', 'RIGHT'] },
    '┃': { inputs: ['UP', 'DOWN'] }, 
    '┣': { inputs: ['UP', 'RIGHT', 'DOWN'] },
    '┫': { inputs: ['UP', 'LEFT', 'DOWN'] },
    '┳': { inputs: ['LEFT', 'RIGHT', 'DOWN'] },
    '┻': { inputs: ['UP', 'LEFT', 'RIGHT'] },
    '╋': { inputs: ['LEFT', 'UP', 'RIGHT', 'DOWN'] }
  };

  return pipes[pipe].inputs;
};

const checkNeighbors = (map, currPipe, currPos, inputs) => {
  const [row, col] = currPos;

  const illegaleDupes = ['┗', '┓', '┏', '┛'];
  const mapPositions = {
    'UP': [row - 1, col],
    'DOWN': [row + 1, col],
    'LEFT': [row, col - 1],
    'RIGHT': [row, col + 1]
  };

  let check = 0;
  for (let input of inputs) {
    const [nRow, nCol] = mapPositions[input];

    if (!map[nRow] || (map[nRow] && !map[nRow][nCol])) {
      check++;
      continue;
    };

    if (map[nRow][nCol] !== '.') { 
      if (illegaleDupes.includes(currPipe) && map[nRow][nCol] !== currPipe) {
        check++;
        continue;
      };
      
      check++;
    };
  };

  if (check === inputs.length) return true;
  return false;
};

const areOldPipes = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if ((i === 0 || i === map.length - 1) && map[i][j] !== '.') return false;
      if ((j === 0 || j === map[i].length - 1) && map[i][j] !== '.') return false;
    };
  };

  return true;
};

const checkPipe = (map) => {
    if (areOldPipes(map)) return true;
    
    for (let i = 0; i < map.length; i++) {
      const currPipes = map[i].split('');

      for (let j = 0; j < currPipes.length; j++) {
        const currPipe = currPipes[j];

        if (currPipe.length && currPipe !== '.') {
          const inputs = mapPipes(currPipe);

          if (!checkNeighbors(map, currPipe, [i, j], inputs)) return false;
        };
      };
    };

    return true;
};