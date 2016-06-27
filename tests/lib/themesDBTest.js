"use strict";

const debug = require("debug")("api:tests:lib:themesDBTest");

const themesDB = require("../../lib/themesDB.js");

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
describe("themesDB", () => {

    it("Deberia retornar todos los themes", () => {
        return themesDB.getThemes().should.eventually.have.length.above(1);
    });

    it("Deberia retornar todos los colors", () => {
        return themesDB.getColors().should.eventually.have.length.above(10);
    });

});