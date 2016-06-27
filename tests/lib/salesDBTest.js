"use strict";

const debug = require("debug")("api:tests:salesDBTest");

const salesDB = require("../../lib/salesDB.js");

const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/**
 * Arrow Functions
 * Passing arrow functions to Mocha is discouraged.
 * Their lexical binding of the this value makes them unable to access the Mocha context,
 * and statements like this.timeout(1000); will not work inside an arrow function.
 */
describe("salesDB", () => {

    it("Deberia retornar todas las ventas teniendo en cuenta los filtros y ordenamiento", () => {
        return salesDB.getSales({page:1,limit:10}, {}, {}).should.eventually.contain.all.keys(['docs', 'total','limit','page','pages']);
    });

    it("Deberia retorna todas las ventas de un hotel en particular", () => {
        return salesDB.getSalesByHotelId({hotelId:331131,page:1,limit:10},{},{}).should.eventually.have.all.keys(['docs', 'total','limit','page','pages']);
    });

});