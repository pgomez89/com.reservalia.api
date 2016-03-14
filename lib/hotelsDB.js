"use strict";

function HotelsDB(){

    var _this = this;
    return {
        getHotels(cb){
            _this.getDB().config.find({},cb);
        },
        getHotelById(params,filters,cb){
            _this.getDB().config.findOne({ _id: ""+params.hotelId},filters,cb);
        }
    }
}


HotelsDB.prototype = require("../prototypes/Lib.js");
module.exports = new HotelsDB();
