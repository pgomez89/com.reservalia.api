"use strict";

var assert = require('assert');

var sort = require("../../sorting/Sorting");

var map = {
    booking_id:"booking_id",
    date: "lastModified",
    checkIn: "checkIn",
    checkOut: "checkOut",
    hotel: "hotelName",
    price: "price_detail.total",
    nightly_price:"price_detail.nightly_price",
};

describe('SalesSortingTest', function() {
    it('Deberia retornar un objeto con los criterios solo con los valores -1 y 1 ', function () {

        var sortingParams = "+date,-price";
        assert.deepEqual({"lastModified":1,"price_detail.total":-1}, sort(map,sortingParams));
    });
});

describe('SalesSortingTest', function() {
    it('Deberia retornar un objeto con un solo criterio =  1 ', function () {

        var sortingParams = "+date";
        assert.deepEqual({lastModified:1}, sort(map,sortingParams));
    });
});

describe('SalesSortingTest', function() {
    it('Deberia retornar un objeto con un solo criterio =  -1 ', function () {

        var sortingParams = "-price";
        assert.deepEqual({"price_detail.total":-1}, sort(map,sortingParams));
    });
});