# METRO

Ejercicio para búsqueda de mejor ruta en entre estaciones del metro.

## Descripción solución

Se utilizó una variante del algoritmo de [Dijkstra](https://es.wikipedia.org/wiki/Algoritmo_de_Dijkstra), en la cual todas las rutas tenian valor "1" en vez de distancias distintas. También a pesar que el problema no lo describía se implementó la multidireccionalidad en las rutas. Osea que si se quiere ir desde el punto **C** hacia **F**, también se podría analizar ir desde **F** hacia **C**.



## Formato archivo
El formato del archivo es el siguiente 

`ESTACION1:COLOR_LINK1,LINK2,..,LINKN|ESTACION2:COLOR_LINK1,LINK2,..,LINKN`

- ESTACION: Nombre de la estación
- COLOR: Color de la estación. Las opciones son r=red, g=green, nc=no color
- LINK: Siguiente estaciones hacia las que se puede ir

### Ejemplo
`a:r_b|b:nc_c,a|c:g_b`


Para este ejemplo la linea de metro sería 

`Estacion(a)color(r)<->Estacion(b)color(nc)<->Estacion(c)color(g)`

Si se quiere modificar la red hay que modificar el [Archivo](src/resources/routes-file.txt). Actualmente tiene cargada la red que venía en la prueba

## Ejecución del programa

La solución fue hecha en nodejs

**¿Porqué en este lenguaje?**

En verdad no hubo mayor análizis y simplemente se optó por esto. Podría haber sido java u otro lenguaje.


**Funciona con cualquier versión > 10**

Una vez instalado nodejs. 

Descargar el repositorio

`git clone https://github.com/tuto/buda-test.git`

Luego 

`npm install`

Con esto estarán instaladas todas las dependencias

Ahora para correr el programa puede ejecutar lo siguiente para obtener ayuda

`node index.js -h`

Lo cual le dará una respuesta como 
``` node index.js -h                                                                                
Modo de uso: -f <first> -l <last> -c <train-color>(optional)

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -f, --first       estacion de inicio                       [string] [required]
  -l, --last        estacion de fin                          [string] [required]
  -c, --colorTrain  color del tren                      [string] [default: "nc"]

Missing required arguments: f, l
```

Una ejecución correcta del programa sería

```
node index.js -f f -l c -c r

RUTA: f->h->c

```


### Tests

Para ejecutar los tests automáticos 

```
npm test

> buda@1.0.0 test /Users/jose.lueiza/Desktop/Proyectos/personales/buda
> nyc mocha --timeout=3000



  Routes
    #getRoute
      ✔ should return the best route from file
      ✔ should return the best route from array
      ✔ should not return if arrival station is not correct
    #printRoute
      ✔ should print the best route from file


  4 passing (14ms)

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |                   
 file.js   |     100 |      100 |     100 |     100 |                   
 point.js  |     100 |      100 |     100 |     100 |                   
 routes.js |     100 |      100 |     100 |     100 |                   
-----------|---------|----------|---------|---------|-------------------

```