"use strict";

const DB = "checkout";
function SalesDB(){
    var _this = this;
    return {
        getSales(params,cb){
            if(typeof params.limit != "undefined" && params.limit > 0){
                if(typeof params.offset != "undefined" && params.offset > -1){
                    console.log("get db skip and limit");
                    _this.getDB(DB).sales.count({}).skip(params.offset).limit(params.limit,cb);
                }else{
                    console.log("get db limit and skip fail");
                    _this.getDB(DB).sales.count({},cb);
                }
            }else{
                console.log("get db all");
                _this.getDB(DB).sales.count({},cb);
            }
        },
        getSalesByHotelId(params,cb){
            if(typeof params.limit != "undefined" && params.limit > 0){
                if(typeof params.offset != "undefined" && params.offset > -1){
                    _this.getDB(DB).sales.count({hotelId:""+params.hotelId}).skip(params.offset).limit(params.limit,cb);
                }else{
                    _this.getDB(DB).sales.count({hotelId:""+params.hotelId},cb);
                }
            }else{
                _this.getDB(DB).sales.count({hotelId:""+params.hotelId},cb);
            }
        }
    }
}

SalesDB.prototype = require("../prototypes/Lib.js");

module.exports = new SalesDB();