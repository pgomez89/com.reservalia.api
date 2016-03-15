"use strict";

var assert = require('assert');

var filter = require("../filters/Filter");
describe('SalesFilterTest', function() {
    it('Deberia retornar un objeto con los filtros solo con los valores iguales 1 ', function () {

        var filtersTest = "date,total_price";
        assert.deepEqual({date:1,total_price:1}, filter(filtersTest));
    });
});