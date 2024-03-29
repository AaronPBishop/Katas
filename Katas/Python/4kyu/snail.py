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

def snail(ls, final_ls=None, i=0, j=0):
    if final_ls is None:
        final_ls = []
    if len(ls) < 1:
        return final_ls
    
    if i==0:
        if len(ls) > 1 and j > 0:
            ls.reverse()
            for curr_ls in ls:
                final_ls.append(curr_ls[0])
                curr_ls.pop(0)
            ls.reverse()

        for el in ls[0]:
            final_ls.append(el)
        ls.pop(0)

    if i==1:
        for curr_ls in ls:
            final_ls.append(curr_ls.pop())
    
    if i==2:
        bottom_row = ls[len(ls) - 1]
        bottom_row.reverse()

        for el in bottom_row:
            final_ls.append(el)
            
        ls.pop()

        return snail(ls, final_ls, i=0, j=j+1)

    i+=1
    j+=1
    return snail(ls, final_ls, i, j)