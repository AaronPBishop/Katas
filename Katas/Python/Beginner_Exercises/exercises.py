def recursive_string(s, l = ''):
    if len(s) == 0:
        return l
  
    strArr = list(s)
    lastLtr = strArr.pop()
    l += lastLtr

    return recursive_string(''.join(strArr), l)

def fill_tuple(tup, val, length):
    finalLs = []
    lsTup = list(tup)

    for i in range(len(lsTup)):
        currTup = tup[i]

        if len(currTup) < length:
            currLs = list(currTup)

            while len(currLs) < length:
                currLs.append(val)

            currTup = currLs
        
        finalLs.append(tuple(currTup))

    return tuple(finalLs)    


def order_decorator(cb):
    def inner(var):
        print(1)
        callCb = cb(var)
        print(3)
        return callCb
    return inner

x = "2"
print(x in {"1": "one", 1: "one", 2: "two"})