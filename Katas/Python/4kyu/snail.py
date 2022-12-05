# Given an n x n list, return the list elements arranged from outermost elements to the middle element, traveling clockwise.

# list = [[1,2,3],
#          [4,5,6],
#          [7,8,9]]
# snail(list) #=> [1,2,3,6,9,8,7,4,5]

# For better understanding, please follow the numbers of the next list consecutively:

# list = [[1,2,3],
#          [8,9,4],
#          [7,6,5]]
# snail(list) #=> [1,2,3,4,5,6,7,8,9]

# NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d list in a clockwise snailshell pattern.

# NOTE 2: The 0x0 (empty matrix) is represented as en empty list inside a list [[]].

def snail(ls):
    if len(ls) < 1:
        return ls

    final_ls = []
    for curr_ls in ls:
        for curr_el in curr_ls:
            pass
            

snail_list = [[1,2,3],
              [8,9,4],
              [7,6,5]]

print(snail(snail_list)) #=> [1,2,3,4,5,6,7,8,9]