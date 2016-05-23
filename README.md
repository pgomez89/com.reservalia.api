# com.reservalia.api
API Reservalia

Esta API provee acceso a los datos y funcionalidades de [Reservalia](http://www.reservalia.com).

Dependecies

 ```json
  {
     "argsparser": "0.0.7",
     "authtoken": "*",
     "boom": "^3.1.2",
     "config": "^1.20.1",
     "debug": "^2.2.0",
     "good": "^6.6.0",
     "good-console": "^5.3.1",
     "hapi": "^13.2.1",
     "hapi-api-version": "^1.0.2",
     "hapi-swaggered": "^2.6.0",
     "hapi-swaggered-ui": "^2.3.1",
     "inert": "^3.2.0",
     "joi": "^8.0.4",
     "mongojs": "^2.3.0",
     "newrelic": "^1.26.0",
     "redis-sentinel": "^0.3.3",
     "vision": "^4.0.1"
   }
 ```
Project Layout

* routes (endpoints de API con HAPI)
* controllers (Lógica y validaciones. Desacoplado de Hapi) 
* lib (Acceso a DB - Mongojs)
* prototypes (Librerias con prototypes para endpoints, controllers y libs)  
* filters (lógica para filters)
* sorting (lógica para ordenamiento)
* tests (test unitarios con mocha)
* config (json con la configuración por ambiente)
* envs (configuración por ambiente, se migrará todo a config)
* public (contiene la documentación de jsdoc, se corre con gulp)
* scripts (script bash para correr en diferentes ambientes)


