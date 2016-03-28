"use strict";

const Joi = require('joi');
const sales = require("../controllers/salesController.js");

function Sales(server){
    var _this = this;

    server.route({
        method:"GET",
        path:"/v1/sales",
        config: Sales.prototype.buildConfig({
            query: {
                limit: Joi.number().required().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                offset:Joi.number().required().min(0).max(100).integer().description('Pagination offset. '),
                sort: Joi.string().description("Sort Options. +ASC -DESC +date -date, +total-price -total-price, +nightly-price -nightly-price"),
                filter: Joi.string().description("Filter Options: booking_id, date, checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        }),
        handler: function(req, reply){
            let params = {
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                offset: typeof req.query.offset != "undefined" ? req.query.offset : 0,
                filter: req.query.filter,
                sort: req.query.sort
            };

            sales.getSales(params,(err,sales) => {
                if(err)
                    return reply(err);
                return reply(sales);
            });
        }
    });

    server.route({
        method:"GET",
        path:"/v1/sales/{hotelId}",
        config: Sales.prototype.buildConfig({
            params:{
                hotelId: Joi.number().required().description("Hotel ID")
            },
            query: {
                limit: Joi.number().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                offset:Joi.number().min(0).max(100).integer().description('Pagination offset. '),
                sort: Joi.string().description("Sort Options. +ASC -DESC +date -date, +total-price -total-price, +nightly-price -nightly-price"),
                filter: Joi.string().description("Filter Options: booking_id, date, checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        }),
        handler: function(req, reply){
            let params = {
                hotelId: req.params.hotelId,
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                offset: typeof req.query.offset != "undefined" ? req.query.offset : 0,
                filter: req.query.filter,
                sort: req.query.sort
            };
            sales.getSalesByHotelId(params,(err,sales) => {
                if(err)
                    return reply(err);
                return reply(sales);
            });
        }
    });
}

Sales.prototype = require("../prototypes/Endpoint.js");
module.exports = Sales;