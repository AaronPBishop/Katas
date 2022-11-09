def recursive_string(s, l = []):
    if (len(s) == 0):
        return ''.join(l)
  
    strArr = list(s)
    lastLtr = strArr.pop()
    l.append(lastLtr)

    return recursive_string(''.join(strArr), l)