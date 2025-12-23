import math
from math import *
import cmath
# x=2; #1
# y=6;
# z=7;
# e=2.71;
# a=math.sqrt(abs(x-1))-math.sqrt(abs(y))/math.pow(y, 1/3) / (1 + x**2/2 + z**2/4)
# print(a)
# b=x*(math.atan(z)+math.pow(e,-y-3))
# print(b)

# x=5; #2
# y=1;
# z=4;
# e=2.71;
# a=(3 + math.pow(e,y-1))/ (1+x*(y-math.tan(z)))
# print(a)

# b=abs(y-x) + (y-x)**2/2 + abs(y-z)**2/3
# print(b)

# x=1; #3
# y=12;
# z=6;
# e=2.71;
# a=x+y/((x**2)+4) /e**(x-2)+1/(z**2+4)
# print(a)
# b=(1+math.cos(y-2)) / (x**4+math.sin(z)**2)
# print(b)

# x=11; #4
# y=5;
# z=10;
# a=(x/z**2)+((x**2)/(y+(x**3)/3))
# print(a)
# b=1+math.asin(x)*(math.tan(y)**2+3.5)
# print(b)

# x=15; #5
# y=7;
# z=3;
# a=2*math.cos(x-math.pi/4)/(0.5+math.sin(y)**2)
# print(a)
# b=1+z**2 / (3+z**2/5)
# print(b)

# x=3; #6
# y=4;
# z=5;
# a=(1+math.sin(x-y)**2) / (2+z/abs(x-(1+y**2)))
# print(a)
# b=math.cos(math.atan(1/z))**2
# print(b)

# x=5; #7
# y=3;
# z=17;
# a=math.log(abs(y-math.sqrt(abs(x))))
# print(a)
# b=x-x**2/math.factorial(3) + x**5/
# math.factorial(5)
# print(b)

# x=7; #8
# y=4;
# z=8;
# a=abs(math.sin(3*x+y+15*z)/math.sqrt(12*x**3+6*y**2+ z**3+ x**2))
# print(a)
# b=math.tan(7*x**2+math.e**(3*y))
# print(b)

# x=17; #9
# y=16;
# z=15;
# a=math.sqrt((abs(math.sin(8*y))+17*x) / (1-math.sin(4*y)*math.cos(z)**2))
# print(a)
# b=math.sqrt(3*z**2 / (3+math.tan(3*x)-math.sin(5*y)))
# print(b)

# x=6; #10
# y=7;
# z=8;
# a=x**(2*y) + (3*cmath.acos(y**3)) / (z**2+x*y)
# print(a)
# b=(abs(x-y)**2)/(3*z+math.cos(x**2))
# print(b)

# x=3; #11
# y=4;
# z=5;
# e=2.71;
# b=2*x**2 + abs(y**2-3*z) / (e**(3*x+y))
# print(b)

# x=4; #12
# y=5;
# z=6;
# a=(cos(x)**2+5*sin(x-y)**3) /log(abs(2*z+y**3))
# print(a)
# b=cmath.asin((4*x**2 +5*y**3)/sqrt(3*z+x**2)) / log(abs(7*x))
# print(b)

# x=5; #13
# y=6;
# z=7;
# a=tan((x+y)**2 - sqrt(cos(z)**2) / tan(z**2))
# print(a)
# b=log(x**2 + (e**(-3*y)) / sin(y)**3)
# print(b)

# x=8; #14
# y=9;
# z=10;
# a=(y/sin(x) + (y/sin(x)**2)-3*cos(z)) * e**(5*x)
# print(a)
# b=(5-e**(z-2)) / (y+(x**2)*abs((z**2)-tan(z)))
# print(b)

# 15
# x,y,z = 9,10,11
# a = abs((y**2)+1)+(y/(sin(z)-e**(z+5)))
# b = sqrt((x-cos(y+z)**2)/5+(log(abs(y-5*x)/sqrt(7))))

# print(a,b)

# a,b,c = int(input()),int(input()),int(input())
# max = a
# if b>max:
#     max = b
# if c>max:
#     max=c
# print(max)

# x=int(input())
# y=0
# if x<=1:
#     y=1-x
# elif 1<x<=2:
#     y = 1/(x**2)
# elif 2<x:
#     y=sqrt(1+(x**2))
# print(y)

a,b,c = int(input()),int(input()),int(input())
if 1<=a<=3:
    print(a)
else:
    print(a,'- [1 - 3] аралығына жатпайды')
if 1<=b<=3:
    print(b)
else:
    print(b,'- [1 - 3] аралығына жатпайды')
if 1<=c<=3:
    print(c)
else:
    print(c,'- [1 - 3] аралығына жатпайды')
