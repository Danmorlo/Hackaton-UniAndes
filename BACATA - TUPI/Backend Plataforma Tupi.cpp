//  Main Software Carvajal Hackathon
//  Created by Bacata Team on 25/10/19.
//  On Universidad de los Andes
//  Copyright © 2019 Bacata. All rights reserved.

#include <iostream>
#include<stdlib.h>
#include<time.h>

using namespace std;


void porcentaje(int validar[14]);   //Se generan los promedios de las actividades


int main() {
    int continuar=0;            //Variable de control aleatoria
    int validar[16];            //Array de numero de veces que se juega una actividad
    bool val=true;              //Variable de control para seguir jugando
    char res = 'y';             //Variable para cambiar el estado del control
    cout<<"¡Hola Mafe, como te encuentras el dia hoy?"<<endl;
    cout<<"A continuacion, tendras la posibilidad de hacer unas actividades"<<endl;
    cout<<"Debes estar atenta al siguiente repertorio de juegos;"<<endl;

    for(int i=0; i<16; i++){    //Se recorre el array de cantidad de veces de una actividad
        validar[i]=0;           //Se limpia el array por medio de 0
    }

    while (val==true) {         //Mientras la variable de control sea verdadera
        
        srand(time(NULL));      //Funcion de numeros aleatorios
        
        continuar = rand();     //Uso de variable continuar con respecto a la funcion aleatorio
        
        continuar=rand()%17;    //Rango de numeros desde 0-16

        cout<<"(1)->Coordinacion Motriz"<<endl;
        cout<<"(2)->Coordinacion Motriz"<<endl;
        cout<<"(3)->Resolucion de Problemas"<<endl;
        cout<<"(4)->Resolucion de Problemas"<<endl;
        cout<<"(5)->Comprension Estructuras 3D"<<endl;
        cout<<"(6)->Comprension Estructuras 3D"<<endl;
        cout<<"(7)->Pensamiento Secuencial"<<endl;
        cout<<"(8)->Pensamiento Secuencial"<<endl;
        cout<<"(9)->Resolucion de problemas grupal"<<endl;
        cout<<"(10)->Resolucion de problemas grupal"<<endl;
        cout<<"(11)->Motricidad Final"<<endl;
        cout<<"(12)->Motricidad Final"<<endl;
        cout<<"(13)->Creatividad"<<endl;
        cout<<"(14)->Creatividad"<<endl;
        cout<<"(15)->Exploracion"<<endl;
        cout<<"(16)->Exploracion"<<endl;
        
        cout<<endl;
        cout<<endl;
        
        cout<<"Maria, el juego que debes realizar en esa ronda es:"<<endl;
        
        switch (continuar) {                    //Menu de opciones de juego
            case 1:
                cout<<"(1)->Coordinacion Motriz"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;    //Se aumenta en uno el numero de veces que se juega
                cout<<"*******jugando*******"<<endl;
                cin.get();                                      //Instruccion de respuesta de usuario para continuar
                break;
            case 2:
                cout<<"(2)->Coordinacion Motriz"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 3:
                cout<<"(3)->Resolucion de Problemas"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 4:
                cout<<"(4)->Resolucion de Problemas"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 5:
                cout<<"(5)->Comprension Estructuras 3D"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 6:
                cout<<"(6)->Comprension Estructuras 3D"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 7:
                cout<<"(7)->Pensamiento Secuencial"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 8:
                cout<<"(8)->Pensamiento Secuencial"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 9:
                cout<<"(9)->Resolucion de problemas grupal"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 10:
                cout<<"(10)->Resolucion de problemas grupal"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 11:
                cout<<"(11)->Motricidad Fina"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 12:
                cout<<"(12)->Motricidad Fina"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 13:
                cout<<"(13)->Creatividad"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 14:
                cout<<"(14)->Creatividad"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 15:
                cout<<"(15)->Exploracion"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            case 16:
                cout<<"(16)->Exploracion"<<endl;
                validar[continuar-1]=validar[continuar-1]+1;
                cout<<"*******jugando*******"<<endl;
                cin.get();
                break;
            default:
                break;
        }

        cout<<"desea jugar otro juego (Y/N)"<<endl;
        cin>>res;
        if(res == 'N'|| res == 'n'){
            val=false;
        }
        cin.get();
        
    }
    
    porcentaje(validar);
    
    return 0;
}

void porcentaje(int validar[16]){
    float aux=0.0, acum=0.0;
    float resultados[16];
    float artistica=0.0, ingenieria=0.0;
    
    cout<<"Es hora de ingresar los resultados"<<endl;
    for(int i=0; i<16; i++){                         //Recorre el arreglo de numero de veces
        cout<<"Ingrese el resultado de la prueba n"<<i+1<<endl;
        if(validar[i]>1){                            //Si en la actividad se jugo mas de una vez, entonces
            for(int i=0; i<validar[i]; i++){        //Entra a un mini ciclo que se recorre hasta la cantidad de veces que se jugo
            cin>>aux;                               //El usuario ingresa el resultado iesimo de la actividad iesima
            acum=acum+aux;                          //Se suman los resultados de la actividad
            acum=acum/validar[i];                   //Se dividen entre la cantidad de veces
            }
            resultados[i]=acum;                     //El resultado final ingresa en el array de resultados en la iesima posicion
        }
        else{                                       //Si en la actividad solo se jugo una vez
            cin>>aux;                               //Entra el resultado
            resultados[i]=aux;                      //El resultado final ingresa en el array de resultados en la iesima posicion
        }
    }
    
    for(int i=0; i<=10; i++){                       //Se recorre el array hasta la 11va posicion (parte de resultados ingenieria)
        acum=acum+resultados[i];                    //Se suman todos los resultados de ingenieria
        ingenieria=acum/11;                         //Se dividen entre la cantidad de resultados
    }
    for(int i=11; i<=16; i++){                      //Se recorre el array hasta la 11va posicion (parte de resultados artistica)
        acum=acum+resultados[i];                    //Se suman todos los resultados de artistica
        artistica=acum/11;                          //Se dividen entre la cantidad de resultados
    }
    
    cout<<"Su hijo es "<<ingenieria<<"%"<<" en ingenieria"<<endl;
    if(ingenieria<4.1){
        cout<<"Su hijo esta en nivel bajo de ingenieria"<<endl;
    }
    if(ingenieria>4.2 && ingenieria<8.3){
        cout<<"Su hijo esta en nivel medio de ingenieria"<<endl;
    }
    if(ingenieria>8.4){
        cout<<"Su hijo esta en nivel alto de ingenieria. Enhorabuena"<<endl;
    }
    
    cout<<endl<<endl;
    
    cout<<"Su hijo es "<<artistica<<"%"<<" en artistica"<<endl;
    if(ingenieria<4.1){
        cout<<"Su hijo esta en nivel bajo de artes"<<endl;
    }
    if(ingenieria>5.6 && ingenieria<11.06){
        cout<<"Su hijo esta en nivel medio de artes"<<" en artes"<<endl;
    }
    if(ingenieria>11.07){
        cout<<"Su hijo esta en nivel alto de artes. Enhorabuena"<<endl;
    }
    
    cout<<endl<<endl;
    
    if(ingenieria>artistica){
        cout<<"Le recomendamos la ruta a su hijo de aprendizaje basado en ingenieria"<<endl;
    }
    else{
        cout<<"Le recomendamos la ruta a su hijo de aprendizaje basado en artes"<<endl;
    }
    
}
