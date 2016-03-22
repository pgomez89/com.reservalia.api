"use strict";

function HotelsDB(){

    var _this = this;
    return {
        getHotels(params,filters,sorting,cb){
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){
                let skip = params.offset * params.limit;
                _this.getDB().config.find({},filters).sort(sorting).skip(skip).limit(params.limit,cb);
            }else{
                _this.getDB().config.find({},cb);
            }
        },
        getHotelById(params,filters,sorting,cb){
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){
                let skip = params.offset * params.limit;
                _this.getDB().config.findOne({ _id: ""+params.hotelId},filters).skip(skip).limit(params.limit);
            }else{
                _this.getDB().config.findOne({ _id: ""+params.hotelId},filters,cb);
            }
        }
    }
}

HotelsDB.prototype = require("../prototypes/Lib.js");
module.exports = new HotelsDB();
