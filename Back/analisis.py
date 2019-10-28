from numpy import *
from numpy.linalg import *
import os
import pandas 
import json

class Analisis():

    def __init__(self,file,puntos):
        self.file = file
        self.datos = self.openFile(self.file)
        self.X = array(self.darMatrizDeFeatures(self.datos))
        self.amount = len(self.X)
        self.puntos = puntos

    def openFile(self,file):
        with open(file) as features:
            feat = json.load(features)
        return feat

    ## ACÁ VA A FALTAR TRATAR LOS DATOS

    def darMatrizDeFeatures(self,datos): #loadea, arregla y normaliza
        X = zeros((10,10))
        
        return X

    #t es el tiempo en pantalla o si acertó o falló en lo que hizo.
    #Los puntajes son del 0-100
    def sis_de_puntos(self,X):
        for i in range(X.shape[1]):
            a = X[:,i]
            if type(a[0]) == bool:
                X[:,i] = list(map(int,a))
            elif type(a) == float:
                normalizacion = 

    def k_vals(self, s, percent=0.9): #esto no importa
        k = 0
        vari = 0
        while vari<percent:
            k+=1
            vari = sum(s[:k])/sum(s)
        return k

    def reduc_dimen(self): #este toca llamarlo para acer reduccion de dimensiones
        covar = (1/(self.amount -1))* self.X.T.dot(self.X)
        u,s,v = svd(covar)
        k = self.k_vals(self,s)
        ured = u[:,:k]
        z = self.X.dot(ured)
        return z, u 

    
    def PCA(self,u): #este hace las lineas de tendencia
        return 0






    



