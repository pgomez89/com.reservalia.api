"use strict";


/**
 * Filter Options: booking_id, date, checkIn, checkOut, hotelName, price_detail
 */


function Filter(map,filters){
    let dbFilter = {};
    if(filters){
        let parts = filters.split(",");

        parts.forEach(val => {
            return dbFilter[ map[val] ] = 1;
        });
    }

    return dbFilter;
}

module.exports = Filter;

