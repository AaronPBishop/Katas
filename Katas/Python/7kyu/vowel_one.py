# Write a function that takes a string and outputs a strings of 1's and 0's where vowels become 1's and non-vowels become 0's.

# All non-vowels including non alpha characters (spaces,commas etc.) should be included.

# Examples:

# vowelOne "abceios" -- "1001110"

# vowelOne "aeiou, abc" -- "1111100100"

def vowel_one(s):
    vowels = 'aeiou'
    finalArr = []

    for i in range (0, len(s)):
        currLetter = s[i].lower()

        if (currLetter in vowels):
            finalArr.append(1)
        else:
            finalArr.append(0)

    return ''.join(map(str, finalArr))