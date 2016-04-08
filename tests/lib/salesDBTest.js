"use strict";

const assert = require("assert");

const salesDB = require("../../lib/SalesDB");

describe("Testeando SalesDB", () => {
    it("Deberia traer todas las ventas por hotelID", () => {
        salesDB.getSalesByHotelId({hotelId:"331131"},{},{}, (err,sales) => {
            assert(sales.length > 0);
            assert.equal(null,err);
        });
    });
});