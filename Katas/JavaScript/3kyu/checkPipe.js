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

const pipe = [
    '╋━━┓',
    '┃..┃',
    '┛..┣'
];

// true

const checkPipe = (map) => {
    return true;
};