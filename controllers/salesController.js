"use strict";

const sales = require("../lib/salesDB.js");

function SalesCtrl(){

    var map = {
        booking_id:"booking_id",
        date: "lastModified",
        checkIn: "checkIn",
        checkOut: "checkOut",
        hotel: "hotelName",
        price: "price_detail.total",
        nightly_price:"price_detail.nightly_price"
    };

    var _this = this;

    return {
        getSales(params,cb){
            let filters = _this.getFilter(map,params.filter);
            let sort = _this.getSort(map,params.sort);
            sales.getSales(params,filters,sort,cb);
        },
        getSalesByHotelId(params,cb){
            let filters = _this.getFilter(map,params.filter);
            let sort = _this.getSort(map,params.sort);
            sales.getSalesByHotelId(params,filters,sort,cb);
        }
    }
}


SalesCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new SalesCtrl();