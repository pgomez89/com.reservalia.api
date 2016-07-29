"use strict";

const metrics = require("../lib/metricsDB.js");
const Errors = require("../lib/errors.js");
/**
 *
 * MetricsCtrl es un controller que maneja la lógica de los objetos de metrics.
 *
 * @class MetricsCtrl
 *
 * @returns {{getSales: (function(*=, *=)), getSalesByHotelId: (function(*=, *=))}}
 * @constructor
 */
function MetricsCtrl(){

    //Mapa donde la key = API path/query param y val = mongodb property
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

        getTotalSales: function(params){
            return new Promise(function(resolve,reject){
                let filters = _this.getFilter(map,params.filter);
                metrics.getTotalSales(filters, (err,data) => err ? reject(err) : resolve(data) );
            });
        },

        getSalesOK: function(params){
            return new Promise(function(resolve,reject){
                let filters = _this.getFilter(map,params.filter);
                metrics.getSalesOk(filters, (err,data) => err ? reject(err) : resolve(data) );
            });
        },

        getSalesWithBookingStatus: function(params){
            return new Promise(function(resolve,reject){
                let filters = _this.getFilter(map,params.filter);
                metrics.getSalesWithBookingStatus(filters, (err,data) => err ? reject(err) : resolve(data) );
            });
        },

        getTotalErrors: function(params){
            return new Promise(function(resolve, reject){
                let filters = _this.getFilter(map, params.filter);
                metrics.getTotalErrors(filters, (err,data) => err ? reject(err) : resolve(data));
            })
        },

        getUnknownErrors: function(params){
            return new Promise(function(resolve, reject){
                let filters = _this.getFilter(map, params.filter);
                metrics.getUnknownErrors(filters, (err,data) => err ? reject(err) : resolve(data));
            })
        },

        getErrorsWithBookingStatus: function(params){
            return new Promise(function(resolve, reject){
                let filters = _this.getFilter(map, params.filter);
                metrics.getErrorsWithBookingStatus(filters, (err,data) => err ? reject(err) : resolve(data));
            })
        },

        getTotalAttemps: function(params){
            return new Promise(function(resolve, reject){
                let filters = _this.getFilter(map, params.filter);
                metrics.getTotalAttemps(filters, (err,data) => err ? reject(err) : resolve(data));
            })
        },

        getTotalTokens: function(params){
            return new Promise(function(resolve, reject){
                let filters = _this.getFilter(map, params.filter);
                metrics.getTotalTokens(filters, (err,data) => err ? reject(err) : resolve(data));
            })
        }
    }
}


MetricsCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new MetricsCtrl();
