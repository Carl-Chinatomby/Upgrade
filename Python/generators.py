from math import sqrt

def genrange(x, y=None, z=None):
    """generator version of the range() function"""
    if y == None:
        start, stop, step = 0, x, 1
    elif z == None:
        start, stop, step = x, y, 1
    else:
        start, stop, step = x, y, z
    
    while start != stop:
        yield start
        start += step


def prime_factors(n):
    """generator function prime_factors returns each prime factor of a numer"""
    if n < 2:
        return
    else:
        i = 2
        limit = n ** 0.5
        while i <= limit:
             if not n % i:
                 yield i
                 n = n / i
                 limit = n ** 0.5
             else:
                 i += 1
