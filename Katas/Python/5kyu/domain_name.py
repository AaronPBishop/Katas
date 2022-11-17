# Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:

# * url = "http://github.com/carbonfive/raygun" -> domain name = "github"
# * url = "http://www.zombie-bites.com"         -> domain name = "zombie-bites"
# * url = "https://www.cnet.com"                -> domain name = cnet"

def domain_name(url):
    domain = ''
    if 'www.' in url:
        domain = url.split('www.')
        url = domain[1]
    if '://' in url:
        domain = url.split('://')
        url = domain[1]
    if '.' in url:
        domain = url.split('.')
        domain = domain[0]
    return domain