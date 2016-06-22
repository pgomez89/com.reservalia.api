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
    getSales(params,filters,sorting){
        if(typeof params.limit != "undefined" && params.limit > 0 &&
            typeof params.page != "undefined" && params.page > 0){
            //Tener en cuenta que utiliza la DB checkout!!!
            return super.getDB(DB).sales.paginate({},filters,{sort:sorting,page:params.page,limit:params.limit});
        }else{
            return new Promise((resolve,reject) => {
                super.getDB(DB).sales.find({},filters).sort(sorting,(err,result) => err ? reject(err) : resolve(result));
            })

        }
    }
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
    getSalesByHotelId(params,filters,sorting){
        if(typeof params.limit != "undefined" && params.limit > 0
            && typeof params.page != "undefined" && params.page > 0){
            //Tener en cuenta que utiliza la DB checkout!!!
            return super.getDB(DB).sales.paginate({hotelId:""+params.hotelId},filters,{sort:sorting,page:params.page,limit:params.limit});
        }else{
            return new Promise((resolve,reject) => {
                super.getDB(DB).sales.find({hotelId:""+params.hotelId},filters).sort(sorting,(err,result) => err ? reject(err) : resolve(result));
            });
        }
    }

}

module.exports = new SalesDB();