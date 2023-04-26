# Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
# Examples

# pig_it('Pig latin is cool') # igPay atinlay siay oolcay
# pig_it('Hello world !')     # elloHay orldway !

def pig_it(text):
    pig_latin = ''

    for word in text.split(' '):
        remaining = list(word)[1:]
        if word.isalpha():
            pig_latin += ''.join(remaining) + word[0] + 'ay '
        else:
            pig_latin += word
        
    return pig_latin.strip()