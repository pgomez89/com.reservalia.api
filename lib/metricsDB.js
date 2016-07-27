"use strict";

const DB = "checkout";
const debug = require("debug")("api:lib:hotelsDB");
const Lib = require("../prototypes/Lib");
const async = require("async");
const moment = require("moment");

class MetricsDB extends Lib {

    /**
     * Obtiene todos los intentos de compras(logs con el mismo booking_id)
     *
     * TODOS LOS LOGS TIENEN QUE TENER SU ID(=BOOKING_ID).
     * IF YOU CHANCE THAT, YOU PUT SHEET ON THE DICK.
     *
     * @param callback
     */

    processFilter(filters) {
        var processDate = function (days) {
            if (days >= 0) {
                return moment().subtract(days, 'days').format("YYYY-MM-DD");
            }
            return moment().format("YYYY-MM-DD");
        };

        var steps = [];
        if (filters) {
            for (var key in filters) {
                var query = {};
                query[key] = filters[key];
                if (key == "lastModified") {
                    query["lastModified"] = {$gte: new Date(processDate(filters[key]))};
                }
                var matchItem = {$match: query};
                steps.push(matchItem);
            }
        }
        return steps;
    }

    processFilterQuery (filters) {
        var processDate = function (days) {
            if (days >= 0) {
                return moment().subtract(days, 'days').format("YYYY-MM-DD");
            }
            return moment().format("YYYY-MM-DD");
        };

        if (filters) {
            var query = {};
            for (var key in filters) {
                query[key] = filters[key];
                if (key == "lastModified") {
                    query["lastModified"] = {$gte: new Date(processDate(filters[key]))};
                }
            }
            return query;
        }
        return {};
    }


    getTotalAttemps(filters, callback) {
        var pipeline = [
            {$group: {_id: "$id"}},
            {$group: {_id: null, count: {$sum: 1}}}
        ];
        if (filters) {
            var steps = this.processFilter(filters);
            pipeline = steps.concat(pipeline);
        }
        this.getDB(DB).checkoutLogs.aggregate(pipeline, callback);
    }

    /**
     * Cantidad de checkout_id vendidos con 1 solo log.(Sin extra steps)
     * @param callback
     */
    getSalesOk(filters, callback) {
        var _this = this;
        var oneShot = 0;
        var extraSteps = 0;
        this.getDB(DB).sales.find(_this.processFilterQuery(filters), {checkout_id: 1, _id: 0}, function (err, docs) {
            async.eachSeries(docs, function (sale, next) {
                _this.getDB(DB).checkoutLogs.count({checkout_id: sale.checkout_id}, function (err, cantLogs) {
                    if (cantLogs == 1) {
                        oneShot++;
                    } else if (cantLogs > 1) {
                        extraSteps++;
                    }
                    next();
                });
            }, function () {
                callback(null, {oneShot: oneShot, extraSteps: extraSteps});
            });
        });
    }

    getTotalSales(filters, callback) {
        var _this = this;
        this.getDB(DB).sales.count(_this.processFilterQuery(filters), callback);
    }

    /**
     * Ventas exitosas con algún paso extra o error
     * @param callback
     */
    getSalesOkWithError(callback) {
        this.getDB(DB).checkoutLogs.aggregate([
            {$match: {saleOk: true}},
            {$group: {_id: "$checkout_id", errors: {$sum: 1}}},
            {$match: {errors: {$gt: 1}}},//Si hay mas de un log para cada checkout es porque tuvo errores
            {$group: {_id: null, count: {$sum: 1}}}
        ], callback);
    }

    getSalesOkByBookingStatusError(filters, callback) {
        var pipeline = [
            {$match: {saleOk: true}},
            {$group: {_id: "$checkout_id", bookingList: {$push: "$booking_status"}}},
            {$match: {bookingList: {$not: {$size: 0}}}},
            {$unwind: "$bookingList"},
            {$group: {_id: "$bookingList", count: {$sum: 1}}}
        ];
        if (filters) {
            pipeline = this.processFilter(filters).concat(pipeline);
        }
        //console.log('pipeline',pipeline);
        this.getDB(DB).checkoutLogs.aggregate(pipeline, callback);
    }

    getTotalForBookingStatus(callback) {
        this.getDB(DB).checkoutLogs.aggregate([
            {$match: {saleOk: true}},
            {$group: {_id: "$checkout_id", errors: {$sum: 1}}},
            {$match: {errors: {$gt: 1}}},
            {$group: {_id: null, count: {$sum: 1}}}
        ], callback);
    }

    /**
     * Ventas Fallidas diferenciadas por BOOKING_STATUS
     * @param callback
     */

    getCheckoutWithError(filters, callback) {
        var pipeline = [
            {$match: {saleOk: {$exists: false}}},
            {$group: {_id: "$checkout_id", bookingList: {$push: "$booking_status"}}},
            {$match: {bookingList: {$not: {$size: 0}}}},
            {$unwind: "$bookingList"},
            {$group: {_id: "$bookingList", count: {$sum: 1}}}
        ];
        if (filters) {
            pipeline = this.processFilter(filters).concat(pipeline);
        }
        //console.log('pipeline',pipeline);
        this.getDB(DB).checkoutLogs.aggregate(pipeline, callback);
    }

    /**
     * Cantidad total de Ventas Fallidas con BOOKING_STATUS
     * @param callback
     */
    getTotalCheckoutWithError(filters, callback) {
        var pipeline = [
            {$match: {saleOk: {$exists: false}}},
            {$group: {_id: "$checkout_id", bookingList: {$push: "$booking_status"}}},
            {$match: {bookingList: {$not: {$size: 0}}}},
            {$unwind: "$bookingList"},
            {$group: {_id: "$bookingList", count: {$sum: 1}}},
            {$group: {_id: null, count: {$sum: "$count"}}}
        ];
        if (filters) {
            pipeline = this.processFilter(filters).concat(pipeline);
        }
        this.getDB(DB).checkoutLogs.aggregate(pipeline, callback);
    }

    /**
     * SIN BOOKING_STATUS
     * @param callback
     */

    getCheckoutWithoutBookingStatus(filters, callback) {
        var pipeline = [
            {$match: {saleOk: {$exists: false}, invalidToken: {$exists: false}, booking_status: {$exists: false}}},
            {$group: {_id: "$id", count: {$sum: 1}}},
            {$group: {_id: null, count: {$sum: 1}}}
        ];
        if (filters) {
            pipeline = this.processFilter(filters).concat(pipeline);
        }
        this.getDB(DB).checkoutLogs.aggregate(pipeline, callback);
    }

    getExpiredTokens(filters, callback) {
        var pipeline = [
            {$match: {invalidToken: {$exists: true}}},
            {$group: {_id: "$id", count: {$sum: 1}}},
            {$group: {_id: null, count: {$sum: 1}}}
        ];
        if (filters) {
            pipeline = this.processFilter(filters).concat(pipeline);
        }
        this.getDB(DB).checkoutLogs.aggregate(pipeline, callback);
    }

    /**
     * Agrupa Cantidad errores en un mismo booking_id
     * @param callback
     */
    getTotalErrorsByCheckout(filters, callback) {
        var pipeline = [
            {$match: {saleOk: {$exists: false}}},
            {$group: {_id: "$id", count: {$sum: 1}}},
            {$group: {_id: null, count: {$sum: 1}}}
        ];
        if (filters) {
            pipeline = this.processFilter(filters).concat(pipeline);
        }
        this.getDB(DB).checkoutLogs.aggregate(pipeline, callback);
    }
}

module.exports = new MetricsDB();

