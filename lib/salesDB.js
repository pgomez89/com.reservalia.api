"use strict";

const DB = "checkout";
const debug = require("debug")("API");

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
function SalesDB(){
    var _this = this;
    return {
        /**
         * Retorna todas las ventas teniendo en cuenta los filtros y ordenamiento.
         *
         * @method
         * @memberof SalesDB
         *
         * @param {object} params - contiene limit y offset obligatoriamente.
         * @param {object} filters - Filtros de mongo: {lastModified:1}
         * @param {object} sorting - Sorting de mongo: {lastModified:-1}
         * @param {libCB} cb - retorna un array de ventas.
         */
        getSales(params,filters,sorting,cb){
            if(typeof params.limit != "undefined" && params.limit > 0 &&
                typeof params.offset != "undefined" && params.offset > -1){

                let skip = params.offset * params.limit;
                //Tener en cuenta que utiliza la DB checkout!!!
                _this.getDB(DB).sales.find({},filters).sort(sorting).skip(skip).limit(params.limit,cb);
            }else{
                _this.getDB(DB).sales.find({},filters).sort(sorting,cb);
            }
        },
        /**
         * Retorna todas las ventas de un hotel en particular.
         *
         * @method
         * @memberof SalesDB
         * @param {object} params - continene el hotelID,limit y offset obligatoriamente.
         * @param {object} filters - Filtros de mongo: {lastModified:1}
         * @param {object} sorting - Sorting de mongo: {lastModified:-1}
         * @param {libCB} cb - retorna un array de ventas.
         */
        getSalesByHotelId(params,filters,sorting,cb){
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){

                let skip = params.offset * params.limit;
                //Tener en cuenta que utiliza la DB checkout!!!
                _this.getDB(DB).sales.find({hotelId:""+params.hotelId},filters).sort(sorting).skip(skip).limit(params.limit,cb);
            }else{
                _this.getDB(DB).sales.find({hotelId:""+params.hotelId},filters).sort(sorting,cb);
            }
        }
    }
}

SalesDB.prototype = require("../prototypes/Lib.js");

module.exports = new SalesDB();