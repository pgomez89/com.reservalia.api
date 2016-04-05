"use strict";


/**
 * Filter Options: booking_id, date, checkIn, checkOut, hotelName, price_detail
 */

/**
 * Devuelve una function que convierte los path/query params de API a un objeto para ordenar en mongo.
 * @param map key value de API - Mongo Property
 * @param filters Params del request
 * @returns {*}
 */
function Filter(map,filters){
    let dbFilter = {};
    if(filters){
        let parts = filters.split(",");

        parts.forEach(val => {
            val = val.trim();
            return dbFilter[ map[val] ] = 1;
        });
    }

    return dbFilter;
}

module.exports = Filter;

