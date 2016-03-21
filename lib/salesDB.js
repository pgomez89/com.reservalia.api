"use strict";

const DB = "checkout";
const debug = require("debug")("API");
function SalesDB(){
    var _this = this;
    return {
        getSales(params,filters,sorting,cb){
            if(typeof params.limit != "undefined" && params.limit > 0 &&
                typeof params.offset != "undefined" && params.offset > -1){

                let skip = params.offset * params.limit;

                _this.getDB(DB).sales.find({},filters).sort(sorting).skip(skip).limit(params.limit,cb);
            }else{
                _this.getDB(DB).sales.find({},filters).sort(sorting,cb);
            }
        },
        getSalesByHotelId(params,filters,sorting,cb){
            if(typeof params.limit != "undefined" && params.limit > 0
                && typeof params.offset != "undefined" && params.offset > -1){
                let skip = params.offset * params.limit;
                _this.getDB(DB).sales.find({hotelId:""+params.hotelId},filters).sort(sorting).skip(skip).limit(params.limit,cb);
            }else{
                _this.getDB(DB).sales.find({hotelId:""+params.hotelId},filters).sort(sorting,cb);
            }
        }
    }
}

SalesDB.prototype = require("../prototypes/Lib.js");

module.exports = new SalesDB();