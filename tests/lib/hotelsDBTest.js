"use strict";


const hotelsDB = require("../../lib/hotelsDB.js");

const assert = require("assert");

describe("Testeando hotelsDB",() => {

    it("Deberia traer todos los hoteles", () => {
        hotelsDB.getHotels({},{},{},(err,hotels) =>{
            console.log(err,hotels.length);
            assert(hotels.length > 0);
        });
    });


});