"use strict";


/**
 * Filter Options: booking_id, date, checkIn, checkOut, hotelName, price_detail
 */


function Filter(filters){

    let parts = filters.split(",");

    let dbFilter = {};

    for(var i = 0; i < parts.length; i++){
        let filter = parts[i];
        dbFilter[filter] =  1;
    }

    return dbFilter;
}

module.exports = Filter;

