# Complete the solution so that the function will break up camel casing, using a space between words.
# Example

# "camelCasing"  =>  "camel Casing"
# "identifier"   =>  "identifier"
# ""             =>  ""

def break_camelcase(str):
    return ''.join([f' {el}' if el.isupper() else el for el in list(str)])

print(break_camelcase('camelCasing'))