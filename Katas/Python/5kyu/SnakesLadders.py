# Snakes and Ladders is an ancient Indian board game regarded today as a worldwide classic. It is played between two or more players on a gameboard having numbered, gridded squares. A number of "ladders" and "snakes" are pictured on the board, each connecting two specific board squares. (Source Wikipedia)

# Your task is to make a simple class called SnakesLadders. The test cases will call the method play(die1, die2) independantly of the state of the game or the player turn. The variables die1 and die2 are the die thrown in a turn and are both integers between 1 and 6. The player will move the sum of die1 and die2.

# Rules

# 1.  There are two players and both start off the board on square 0.

# 2.  Player 1 starts and alternates with player 2.

# 3.  You follow the numbers up the board in order 1=>100

# 4.  If the value of both die are the same then that player will have another go.

# 5.  Climb up ladders. The ladders on the game board allow you to move upwards and get ahead faster. If you land exactly on a square that shows an image of the bottom of a ladder, then you may move the player all the way up to the square at the top of the ladder. (even if you roll a double).

# 6.  Slide down snakes. Snakes move you back on the board because you have to slide down them. If you land exactly at the top of a snake, slide move the player all the way to the square at the bottom of the snake or chute. (even if you roll a double).

# 7.  Land exactly on the last square to win. The first person to reach the highest square on the board wins. But there's a twist! If you roll too high, your player "bounces" off the last square and moves back. You can only win by rolling the exact number needed to land on the last square. For example, if you are on square 98 and roll a five, move your game piece to 100 (two moves), then "bounce" back to 99, 98, 97 (three, four then five moves.)

# 8.  If the Player rolled a double and lands on the finish square “100” without any remaining moves then the Player wins the game and does not have to roll again.

# Returns

# Return Player n Wins!. Where n is winning player that has landed on square 100 without any remainding moves left.

# Return Game over! if a player has won and another player tries to play.

# Otherwise return Player n is on square x. Where n is the current player and x is the sqaure they are currently on.

# Good luck and enjoy!

class SnakesLadders():
    def __init__(self):
        self.curr_player = 1
        self.player1_square = 0
        self.player2_square = 0
        self.has_won = False

    def determine_square(self, player):
        board_dict = {
            2: 38,
            7: 14,
            8: 31,
            15: 26,
            21: 42,
            28: 84,
            36: 44,
            51: 67,
            71: 91,
            78: 98,
            87: 94,
            16: 6,
            46: 25,
            49: 11,
            62: 19,
            64: 60,
            74: 53,
            89: 68,
            92: 88,
            95: 75,
            99: 80,
        }

        if player == 1:
            if self.player1_square in board_dict:
                self.player1_square = board_dict[self.player1_square]
                return None
        
        if player == 2:
            if self.player2_square in board_dict:
                self.player2_square = board_dict[self.player2_square]
                return None


    def play(self, die1, die2):
        if self.has_won == True:
            return 'Game over!'
        
        if self.curr_player == 1:
            exceeded = False
            for i in range(0, die1 + die2):
                if exceeded == False:
                    self.player1_square += 1
                    if (self.player1_square == 100):
                        exceeded = True
                        continue

                if exceeded == True:
                    self.player1_square -= 1

            self.determine_square(1)

            if (self.player1_square == 100):
                self.has_won = True
                return 'Player 1 Wins!'

        if self.curr_player == 2:
            exceeded = False
            for i in range(0, die1 + die2):
                if exceeded == False:
                    self.player2_square += 1
                    if (self.player2_square == 100):
                        exceeded = True
                        continue
                    
                if exceeded == True:
                    self.player2_square -= 1
            
            self.determine_square(2)

            if (self.player2_square == 100):
                self.has_won = True
                return 'Player 2 Wins!'
        
        if self.curr_player == 1:
            if die1 != die2:
                self.curr_player = 2
            return f'Player 1 is on square {self.player1_square}'
        
        if self.curr_player == 2:
            if die1 != die2:
                self.curr_player = 1
            return f'Player 2 is on square {self.player2_square}'