import scipy.optimize as opt

pi1 = 0.5
pi2 = 0.5
tomato_sell =  340000 #$/ha
arr_sell = 500000
D = 1000000
H = 7
r = [[2.1, 1.5], [1.1, 1.9]]
c = [-pi1*r[0][0]*tomato_sell, -pi2*r[0][1]*tomato_sell, -pi1*r[1][0]*arr_sell, -pi2*r[1][1]*arr_sell]

A = [[1, 1, 1, 1], [-r[0][0]*tomato_sell, 0, -r[1][0]*arr_sell, 0], [0, -r[0][1]*tomato_sell, 0, -r[1][1]*arr_sell]]
b = [[H], [-1.2*D], [-1.2*D]]
x11_b = (0, None)
x12_b = (0, None)
x21_b = (0, None)
x22_b = (0, None)
bounds = [x11_b, x12_b, x21_b, x22_b]

res = opt.linprog(c, A, b, bounds=bounds)
print(res)