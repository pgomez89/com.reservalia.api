"use strict";

const DB = "checkout";
function SalesDB(){
    var _this = this;
    return {
        getSales(params,cb){
            if(typeof params.limit != "undefined" && params.limit > 0 &&
                typeof params.offset != "undefined" && params.offset > -1){

                let skip = params.offset * params.limit;
                _this.getDB(DB).sales.find({}).skip(skip).limit(params.limit,cb);
            }else{
                _this.getDB(DB).sales.find({},cb);
            }
        },
        getSalesByHotelId(params,cb){
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){
                let skip = params.offset * params.limit;
                _this.getDB(DB).sales.find({hotelId:""+params.hotelId}).skip(skip).limit(params.limit,cb);
            }else{
                _this.getDB(DB).sales.find({hotelId:""+params.hotelId},cb);
            }
        }
    }
}

SalesDB.prototype = require("../prototypes/Lib.js");

module.exports = new SalesDB();