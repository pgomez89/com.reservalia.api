"use strict";

const sales = require("../lib/salesDB.js");

function SalesCtrl(){

    return {
        getSales(params,cb){
            sales.getSales(params,cb);
        },
        getSalesByHotelId(params,cb){
            sales.getSalesByHotelId(params,cb);
        }
    }
}


SalesCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new SalesCtrl();