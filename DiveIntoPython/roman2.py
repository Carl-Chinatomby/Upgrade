#define exceptions
class RomanError(Exception): pass
class OutOfRangeError(RomanError): pass
class NotIntegerError(RomanError): pass
class InvalidRomanNumeralError(RomanError): pass

#Define digit mapping
romanNumeralMap = (('M', 1000),
                   ('CM', 900),
				   ('D', 500),
				   ('CD', 400),
				   ('C', 100),
				   ('XC', 90),
				   ('L', 50),
				   ('XL', 40),
				   ('X', 10),
				   ('IX', 9),
				   ('V', 5),
				   ('IV', 4),
				   ('I', 1))
				
def toRoman(n):
	"""convert integer to Roman numeral"""
	result = ""
	for numeral, integer in romanNumeralMap:
		while n >= integer:
			result += numeral
			n -= integer
	return result

def fromRoman(s):
	"""convert Roman numeral to integer"""
	result = 0
	index = 0
	for numeral, integer in romanNumeralMap:
		while s[index:index+len(numeral)] == numeral:
			result += integer
			index += len(numeral)
	return result