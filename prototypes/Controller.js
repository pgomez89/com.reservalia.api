"use strict";

/**
 * Prototype base para todos los controllers
 *
 * Para implementar utilizar
 *
 * utils.inherits(MyCtrl,Controller);
 *
 * @returns {*}
 * @constructor
 */
function Controller(){

    //Libs
    const sorting = require("../sorting/Sorting.js");
    const filter  = require("../filters/Filter.js");

    return {
        /**
         * Convierte los path/query params de API a un objeto para ordenar en mongo.
         * @param map key value de API - Mongo Property
         * @param params - Params del request
         * @returns {*}
         */
        getSort(map,params){
            return sorting(map,params);
        },
        /**
         * Convierte los path/query params de API a un objeto para ordenar en mongo.
         * @param map key value de API - Mongo Property
         * @param filters Params del request
         * @returns {*}
         */
        getFilter(map,filters){
            return filter(map,filters);
        }
    }
}

module.exports = new Controller();