"use strict";

const Lib = require("../prototypes/Lib");
const debug = require("debug")("api:lib:hotelsDB");
/**
 * HotelsDB es una lib que accede a la base de datos que contiene los hotels de reservalia.
 *
 * HotelsDB pertence a la capa lib y como tal debe extender del prototype Lib.
 *
 * Cada Lib tiene acceso a acceder a cualquier db dentro del sistema.
 *
 * @class
 * @returns {{getHotels: (function(*, *=, *=, *=)), getHotelById: (function(*, *=, *, *=)), getHotelsOnline: (function(*, *=, *=, *=))}}
 * @constructor
 */
class HotelsDB extends Lib {
    
    /**
     * Retorna todos los hotels teniendo en cuenta los parámetros, filtrado y ordenamiento
     * @method
     * @memberof HotelsDB
     *
     * @param {object} params - contiene limit y offset obligatoriamente.
     * @param {object} filters - Filtros de mongo: {lastModified:1}
     * @param {object} sorting - Sorting de mongo: {total_price:-1}
     * @returns {Promise}
     */
    getHotels(params,filters,sorting){

        if(typeof params.limit != "undefined" && params.limit > 0
            && typeof params.page != "undefined" && params.page > 0){
            return super.getDB().config.paginate({},filters,{sort:sorting,limit:params.limit, page:params.page});
        }else{
            return new Promise( (resolve,reject)=>{
                super.getDB().config.find({},(err,result)=>err ? reject(err) : resolve(result));
            });
        }
    }
    /**
     *
     * Retorna un hotel por id
     * @method
     * @memberof HotelsDB
     *
     * @param {object} params - Contiene el id del hotel y filtros.
     * @param {boject} filters - Filtros de mongo: {lastModified:1}
     * @param {object} sorting - Sorting de mongo: {total_price:-1}
     * @returns {Promise}
     */
    getHotelById(params,filters,sorting){
        return new Promise( (resolve,reject) => {
            if(typeof params.hotelId !== "undefined"){
                super.getDB().config.findOne({ _id: ""+params.hotelId},filters,(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }else{
                reject();
            }
        });

    }
    /**
     *
     * Retorna todos los hotels ONLINE teniendo en cuenta los parámetros, filtrado y ordenamiento
     *
     * @method
     * @memberof HotelsDB
     *
     * @param {object} params - contiene limit y offset obligatoriamente.
     * @param {object} filters - Filtros de mongo: {lastModified:1}
     * @param {object} sorting - Sorting de mongo: {total_price:-1}
     * @returns {Promise}
     */
    getHotelsOnline(params,filters,sorting){

        if(typeof params.limit != "undefined" && params.limit > 0
            && typeof params.page != "undefined" && params.page > 0){
            return super.getDB().config.paginate({"general.domains.online":true},filters,{sort:sorting,limit:params.limit, page:params.page});
        }else{
            return new Promise((resolve,reject)=>{
                super.getDB().config.find({"general.domains.online":true},(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            });
        }
    }
}

//HotelsDB.prototype = require("../prototypes/Lib.js");
module.exports = new HotelsDB();

/**
 * @callback libCB
 * @param {object} err mongojs error
 * @param {object} data mongojs resultado
 **/