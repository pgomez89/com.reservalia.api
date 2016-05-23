#  API Reservalia

> Esta API provee acceso a los datos y funcionalidades de [Reservalia](http://www.reservalia.com).

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
##  Project Layout

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

Request pasa por estas 3 capas, en ese orden.

* Routes (Hapi)
* Controllers (Lógica)
* Lib (Acceso a DB)

Cada capa usa un el prototype (prototype o clase padre) correspondiente

* Routes => prototypes/Endpoint.js
* Controllers => prototypes/Controller.js
* Lib => prototypes/Lib.js

Si creo una Lib que necesita acceder a la DB tengo que extender de prototypes/Lib.js

```javascript
"use strict";
const DB = "checkout";
const debug = require("debug")("API");
const Lib = require("../prototypes/Lib");

/**
 * SalesDB es una lib que accede a la base de datos que contiene los hotels de reservalia.
 *
 * SalesDB pertence a la capa lib y como tal debe extender del prototype Lib.
 *
 * Cada Lib tiene acceso a acceder a cualquier db dentro del sistema.
 *
 * @class
 * @returns {{getSales: (function(*, *=, *=, *=)), getSalesByHotelId: (function(*, *=, *=, *=))}}
 *
 */
class SalesDB extends Lib{
    //Insert methods here
}
```

Si creo un controller, debo pisar el prototype por el momento(se cambiará a prototypes o class)

```javascript
HotelCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new HotelCtrl();
```

Lo mismo ocurre con routes

```javascript
Hotels.prototype = require("../prototypes/Endpoint.js");

module.exports = Hotels;
```

Para crear un endpoint (una ruta de API) tengo que tener en cuenta la config de swagger. Para esto se agregó el 
método buildConfig, que recibe la config que necesita swagger para dibujar el endpoint y a su vez validar el input.

```javascript
server.route({
        method: 'GET',
        path: '/v1/hotels/{hotelId}',
        config: Hotels.prototype.buildConfig({
            params: {
                // Tiene que coincidir el Path Param con el params del objeto Validate.
                hotelId: Joi.number().required().description('Hotel ID from PAM')
            },
            query:{
                filter: Joi.string().description("Filter Options: TODO put fields here. If you don't put anything, by default API retrieves you the reduce version of sale"),
                reduce: Joi.boolean().description("Reduce version of Hotel")
            }
        },statusCodes['/v1/hotels/{hotelId}']),
        handler: function (req, reply) {
            let params = {
                hotelId: req.params.hotelId,
                filter:req.query.filter,
                reduce: req.query.reduce
            };
            hotels.getHotelById( params,(err,hotel) =>  Response.do( reply, err, hotel ,'/v1/hotels/{hotelId}') );
        }
    });
```

Como se ve, handler recibe req y reply. La librería Response valida la respuesta.
###  Es obligatorio llamar a Response.do para devolver los request porque genera los headers.

> La idea es que el endpoint no tenga lógica y sea lo mas compacto posible, de esta manera podemos desacoplarnos y utilizar
la herramienta que queramos y podemos testear por separado.
 
El handler llama al controller
```javascript
    hotels.getHotelById(...)
```

Veamos el método gethotelById en hotelsController.js

```javascript
getHotelById(params,cb){

            if(typeof params.filter !== "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            Promise.all([
                hotels.getHotelById(params,filters,sort),
                themes.getColors()
            ]).then(function onFullFilled(responses){
                let hotelRaw = responses.shift();
                let colors = responses.shift();
                return cb(null,buildHotel({ hotelRaw,colors}));

            }).catch(function onRejected(err){
                console.log(err);
                return cb(Errors.noHotel,null);
            });
        },
```

Ejecuta una serie de request dentro de una Promise. Cuando termina, se arma el buildHotel y se llama al callback. En un futuro se cambiará a Promise
La Promise hacen llamados a métodos de lib/.

Veamos getHotelById en /lib/hotelsDB.js
```javascript

getHotelById(params,filters,sorting){
        return new Promise( (resolve,reject)=>{
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){
                let skip = params.offset * params.limit;
                super.getDB().config.findOne({ _id: ""+params.hotelId},filters).skip(skip).limit(params.limit,(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }else{
                super.getDB().config.findOne({ _id: ""+params.hotelId},filters,(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }
        });

    } 
```
getHotelById devuelve una Promise en base al callback de mongojs. Tiene en cuenta los filtros y ordenamiento.

Así es el flujo de un request en API. Puede que en el medio haya lógica de ordenamiento y filtrado con código sincrónico.


