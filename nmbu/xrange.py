def xrange(start, stop, step):
    """
    xrange(start, stop, step) -> list object

    Parameters
    ----------
    start : float
        The first value
    stop : float
        The last value (included - different from range() function)
    step : float
        The interval between values

    Returns
    -------
    list
        A list with a sequence of float values

    Examples
    --------
    >>> xrange(-2, 2, 0.5)
    [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0]
    """
    
    num_steps = int((stop - start) / step) + 1
    return [start + i * step for i in range(num_steps)]