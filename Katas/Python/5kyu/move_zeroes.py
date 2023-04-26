# Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

# move_zeros([1, 0, 1, 2, 0, 1, 3]) # returns [1, 1, 2, 1, 3, 0, 0]

def move_zeros(lst):
    zeroes = [el for el in lst if el == 0]
    filtered = [el for el in lst if el != 0]
    filtered.extend(zeroes)
    
    return filtered

print(move_zeros([1, 0, 1, 2, 0, 1, 3]))