"use strict";

const sales = require("../lib/salesDB.js");

function SalesCtrl(){

    var map = {
        booking_id:"booking_id",
        date: "lastModified",
        checkIn: "checkIn",
        checkOut: "checkOut",
        hotel: "hotelName",
        price: "price_detail"
    };

    var _this = this;

    return {
        getSales(params,cb){
            var filters = _this.getFilter(map,params.filter);
            var sort = _this.getSort(map,params.sort);
            sales.getSales(params,filters,sort,cb);
        },
        getSalesByHotelId(params,cb){
            sales.getSalesByHotelId(params,cb);
        }
    }
}


SalesCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new SalesCtrl();