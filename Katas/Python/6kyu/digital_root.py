# Digital root is the recursive sum of all the digits in a number.

# Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.
# Examples

#     16  -->  1 + 6 = 7
#    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
# 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
# 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2

def digital_root(num, sum = 0, i = 0):
    if len(list((str(num)))) == 2 and 1 == 0:
        return list(str(num))[0] + list(str(num))[1]
    
    if len(list((str(num)))) == 0:
        if len(list(str((sum)))) > 1:
            return digital_root(sum, sum = 0, i = 0)
        return sum

    lsNum = list(str(num))
    currNum = lsNum.pop()

    sum += int(currNum)
    i += 1

    return digital_root(''.join(lsNum), sum, i)