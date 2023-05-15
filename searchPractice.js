/*
You are given the whole maze maze as a 2D grid, more specifically in your language:

an array of strings

maze[0][0] is the top left-hand corner

maze[maze.length - 1][maze[0].length - 1] is the bottom right-hand corner

Inside this 2D grid:

    ' ' is some walkable space
    '#' is a thorn bush (you can't pass through)
    '^', '<', 'v' or '>' is your sleeping body facing respectively the top, left, bottom or right side of the map.

Output

Write the function escape that returns the list/array of moves you need to do relatively to the direction you're facing in order to escape the maze (you won't be able to see the map when you wake up). as an array of the following instructions:

    'F' move one step forward
    'L' turn left
    'R' turn right
    'B' turn back

        Note: 'L','R', and 'B' ONLY perform a rotation and will not move your body

If the maze has no exit, return an empty array.

    This is a real maze, there is no "escape" point. Just reach the edge of the map and you're free!
    You don't explicitely HAVE to find the shortest possible route, but you're quite likely to timeout if you don't ;P
    Aside from having no escape route the mazes will all be valid (they all contain one and only one "body" character and no other characters than the body, "#" and " ". Besides, the map will always be rectangular, you don't have to check that either)
*/

const mockMaze1 = [ 
    '##########',
    '#        #',
    '#  ##### #',
    '#  #   # #',
    '#  #^# # #',
    '#  ### # #',
    '#      # #',
    '######## #' 
];

const mockMaze2 = [ 
    '##########',
    '#       <#',
    '# ### ####',
    '# ### ####',
    '#        #',
    '######## #',
];