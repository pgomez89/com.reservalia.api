"use strict";

const sales = require("../../controllers/salesController.js");
const debug = require("debug")("api:tests:controllers:SalesController");

const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe("SalesControllers", () => {
    it("Debería traer todas las ventas de la página 1 (10 items)", ()=>{
        let params = {
            limit: 10,
            page: 1,
            filter:"",
            sort: ""
        };
        return sales.getSales(params).should.eventually.have.all.keys(['docs', 'total','limit','page','pages']);
    });
    it("Debería traer todas las ventas del hotel 331131 en la página 1 (10 items)", ()=>{
        let params = {
            limit: 10,
            page: 1,
            filter:"",
            sort: "",
            hotelId:331131
        };
        return sales.getSalesByHotelId(params).should.eventually.have.all.keys(['docs', 'total','limit','page','pages']);
    });
});