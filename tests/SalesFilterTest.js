"use strict";

var assert = require('assert');

var filter = require("../filters/Filter");


var mapFilter = {
    booking_id:"booking_id",
    date: "lastModified",
    checkIn: "checkIn",
    checkOut: "checkOut",
    hotel: "hotelName",
    price: "price_detail"
};

describe('SalesFilterTest', function() {
    it('Deberia retornar un objeto con los filtros solo con los valores iguales 1 ', function () {

        var filtersTest = "date,price";
        assert.deepEqual({lastModified:1,price_detail:1}, filter(mapFilter,filtersTest));
    });
});

describe('SalesFilterTest', function() {
    it('Deberia retornar un objeto con una sola key = 1 ', function () {

        var filtersTest = "date";
        assert.deepEqual({lastModified:1}, filter(mapFilter,filtersTest));
    });
});