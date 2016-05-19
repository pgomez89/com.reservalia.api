"use strict";

const Lib = require("../prototypes/Lib");

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
     * @param {libCB} cb - callback
     */
    getHotels(params,filters,sorting){

        return new Promise( (resolve,reject)=>{
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){
                let skip = params.offset * params.limit;
                super.getDB().config.find({},filters).sort(sorting).skip(skip).limit(params.limit,(err,result) => {
                    err ? reject(err) : resolve(result);
                });
            }else{
                super.getDB().config.find({},(err,result)=>err ? reject(err) : resolve(result));
            }
        });
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
     * @param {libCB} cb - callback
     */
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
     * @param {libCB} cb - callback
     */
    getHotelsOnline(params,filters,sorting){
        return new Promise((resolve,reject)=>{
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){
                let skip = params.offset * params.limit;
                super.getDB().config.find({"general.domains.online":true},filters).sort(sorting).skip(skip).limit(params.limit,(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }else{
                super.getDB().config.find({"general.domains.online":true},(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }
        });

    }
    
}

//HotelsDB.prototype = require("../prototypes/Lib.js");
module.exports = new HotelsDB();

/**
 * @callback libCB
 * @param {object} err mongojs error
 * @param {object} data mongojs resultado
 **/