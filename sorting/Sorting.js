"use strict";

/**
 * Devuelve una función que convierte los path/query params de API a un objeto para ordenar en mongo.
 * @param map key value de API - Mongo Property
 * @param params - Params del request
 * @returns {*}
 */
function Sorting(map,params){
    let dbSorting = {};
    if(params){
        let parts = params.split(",");

        parts.forEach( val => {
            val = val.trim();
            if(val[0] == "+")
                dbSorting[ map [ val.slice(1,val.length) ] ] = 1;
            if(val[0] == "-")
                dbSorting[ map [ val.slice(1,val.length) ] ] = -1;
        });
    }

    return dbSorting;
}

module.exports = Sorting;

