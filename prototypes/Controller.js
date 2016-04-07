"use strict";

/**
 * Prototype base para todos los controllers
 *
 * Para implementar utilizar
 *
 * utils.inherits(MyCtrl,Controller);
 *
 * @module Controller
 * @returns {*}
 *
 */
function Controller(){

    //Libs
    /**
     * @const Sorting sorting
     */
    const sorting = require("../sorting/Sorting.js");
    /**
     * @const Filter filter
     */
    const filter  = require("../filters/Filter.js");

    return {
        /**
         * Convierte los path/query params de API a un objeto para ordenar en mongo.
         * @param {object} map key value de API - Mongo Property
         * @param {object} params - Params del request
         * @returns {object} key value for mongodb.
         */
        getSort(map,params){
            return sorting(map,params);
        },
        /**
         * Convierte los path/query params de API a un objeto para ordenar en mongo.
         * @param {object} map key value de API - Mongo Property
         * @param {object} filters Params del request
         * @returns {object} key value for mongodb.
         */
        getFilter(map,filters){
            return filter(map,filters);
        }
    }
}

module.exports = new Controller();