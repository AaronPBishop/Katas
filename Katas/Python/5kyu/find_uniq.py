# There is an array of strings. All strings contains similar letters except one. Try to find it!

# find_uniq([ 'Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a' ]) # => 'BbBb'
# find_uniq([ 'abc', 'acb', 'bac', 'foo', 'bca', 'cab', 'cba' ]) # => 'foo'

# Strings may contain spaces. Spaces are not significant, only non-spaces symbols matters. E.g. string that contains only spaces is like empty string.

# It’s guaranteed that array contains more than 2 strings.

def generate_dict(ls):
    str_dict = {}
    for str in ls:
        if not str:
            if 'empty' in str_dict:
                str_dict['empty'] += 1
            else:
                str_dict['empty'] = 1
            continue

        if all(char.lower() == str[0].lower() for char in str):
            if str[0].lower() in str_dict:
                str_dict[str[0].lower()] += 1
            else:
                str_dict[str[0].lower()] = 1
            continue

        cleaned_str = ''.join(sorted(str.lower())).strip()
        if cleaned_str in str_dict:
            str_dict[cleaned_str] += 1
        else:
            str_dict[cleaned_str] = 1
    return [str_dict, min(str_dict.values())]


def find_uniq(ls):
    [str_dict, min_value] = generate_dict(ls)
    for str in ls:
        for key, val in str_dict.items():
            if not str:
                if key == 'empty' and val == min_value:
                    return str
                else: 
                    continue
            if all(char.lower() == str[0].lower() for char in str):
                if str[0].lower() == key and val == min_value:
                    return str
            if ''.join(sorted(str.lower())).strip() == key and val == min_value:
                return str