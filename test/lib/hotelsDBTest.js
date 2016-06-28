"use strict";

const debug = require("debug")("api:tests:lib:hotelsDBTest");

const hotelsDB = require("../../lib/hotelsDB.js");

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
describe("hotelsDB", () => {

    it("Deberia traer un hotel por id que al menos tenga _id y general", () => {
        return hotelsDB.getHotelById({hotelId: 331131}, {}, {}).should.eventually.contain.all.keys(['_id', 'general']);
    });

    it("Deberia traer los hoteles online con todas las properties", () => {
        return hotelsDB.getHotelsOnline({page:1,limit:10},{},{}).should.eventually.have.all.keys(['docs', 'total','limit','page','pages']);
    });

    it("Deberia traer la página 1 con 10 elementos con todas las properties", () => {
        return hotelsDB.getHotels({page:1,limit:10},{},{}).should.to.eventually.have.all.keys(['docs', 'total','limit','page','pages']);
    });

});