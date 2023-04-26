def pig_it(text):
    pig_latin = ''

    for word in text.split(' '):
        remaining = list(word)[1:]
        if word.isalpha():
            pig_latin += ''.join(remaining) + word[0] + 'ay '
        else:
            pig_latin += word
        
    return pig_latin.strip()