import numpy as np
import sklearn as sk
import scipy.stats as st
import random
import matplotlib.pyplot as plt
import matplotlib
font = {'family' : 'normal',
        'weight' : 'bold',
        'size'   : 14}

matplotlib.rc('font', **font)

def filter_data():
    file_papa = open('papa.csv', 'r').read().split('\n')[1:]
    papa = []
    for i in range(len(file_papa)):
        papa.append(float(file_papa[i]))
    return papa


def regression():
    papas = filter_data()
    prep = open('prep.csv', 'r').read().split('\n')

    for i in range(len(prep)):
        prep[i] = float(prep[i])

    regr = st.linregress(prep, papas)
    m = regr.slope
    b = regr.intercept
    tout = np.linspace(0,50,200)
    fout = lambda t : m * tout + b
    plt.figure(1)
    plt.plot(tout,fout(tout), 'k')
    plt.scatter(prep, papas)
    plt.ylabel('Efectividad de Cultivo (ton/ha).')
    plt.xlabel('Volumen de Precipitación.')
    plt.savefig('regr.pdf', bbox_inches='tight')
    plt.show()

regression()