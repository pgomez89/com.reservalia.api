"use strict";

var assert = require('assert');

var sort = require("../sorting/Sorting");
describe('SalesSortingTest', function() {
    it('Deberia retornar un objeto con los filtros solo con los valores -1 y 1 ', function () {

        var sortingParams = "+date,-total_price";
        assert.deepEqual({date:1,total_price:-1}, sort(sortingParams));
    });
});

describe('SalesSortingTest', function() {
    it('Deberia retornar un objeto con un solo filtro =  1 ', function () {

        var sortingParams = "+date";
        assert.deepEqual({date:1}, sort(sortingParams));
    });
});

describe('SalesSortingTest', function() {
    it('Deberia retornar un objeto con un solo filtro =  -1 ', function () {

        var sortingParams = "-total_price";
        assert.deepEqual({total_price:1}, sort(sortingParams));
    });
});