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

