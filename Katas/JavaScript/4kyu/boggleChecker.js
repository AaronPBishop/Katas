// Write a function that determines whether a string is a valid guess in a Boggle board, as per the rules of Boggle. A Boggle board is a 2D array of individual characters, e.g.:

const exampleBoard = [ 
    ["I","L","A","W"],
    ["B","N","G","E"],
    ["I","U","A","O"],
    ["A","S","R","L"] 
];

// Valid guesses are strings which can be formed by connecting adjacent cells (horizontally, vertically, or diagonally) without re-using any previously used cells.

// For example, in the above board "BINGO", "LINGO", and "ILNBIA" would all be valid guesses, while "BUNGIE", "BINS", and "SINUS" would not.

// Your function should take two arguments (a 2D array and a string) and return true or false depending on whether the string is found in the array as per Boggle rules.

// Test cases will provide various array and string sizes (squared arrays up to 150x150 and strings up to 150 uppercase letters). You do not have to check whether the string is a real word or not, only if it's a valid guess.

const checkWord = (board, word) => {
    const boardCopy = [...board];
    const splitWord = word.split("");
  
    const dfs = (row, col, index) => {
      if (row < 0 || row >= boardCopy.length || col < 0 || col >= boardCopy[0].length || boardCopy[row][col] !== splitWord[index]) return false;
  
      if (index === splitWord.length - 1) return true;
  
      const temp = boardCopy[row][col];
      boardCopy[row][col] = null;
  
      const res = dfs(row - 1, col, index + 1) ||
                  dfs(row + 1, col, index + 1) ||
                  dfs(row, col - 1, index + 1) ||
                  dfs(row, col + 1, index + 1) ||
                  dfs(row - 1, col - 1, index + 1) ||
                  dfs(row - 1, col + 1, index + 1) ||
                  dfs(row + 1, col - 1, index + 1) ||
                  dfs(row + 1, col + 1, index + 1);
  
        boardCopy[row][col] = temp;
        return res;
    };
  
    for (let row = 0; row < boardCopy.length; row++) {
      for (let col = 0; col < boardCopy[row].length; col++) {
        if (dfs(row, col, 0)) return true;
      };
    };
  
    return false;
};