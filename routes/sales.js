"use strict";

const Joi = require('joi');
const sales = require("../controllers/salesController.js");

function Sales(server){

    server.route({
        method:"GET",
        path:"/api/v1/sales",
        config: Sales.prototype.buildConfig({
            query: {
                limit: Joi.number().description('Page Limit between 0 and 100'),
                offset:Joi.number().description('Pagination offset.')
            }
        }),
        handler: function(req, reply){
            var params = {
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                offset: typeof req.query.offset != "undefined" ? req.query.offset : 0
            };

            sales.getSales(params,(err,sales) =>{
                if(err)
                    return reply(err);
                return reply(sales);
            });
        }
    });

    server.route({
        method:"GET",
        path:"/api/v1/sales/{hotelId}",
        config: Sales.prototype.buildConfig({
            params:{
                hotelId: Joi.number().required().description("Hotel ID")
            },
            query: {
                limit: Joi.number().description('Page Limit between 0 and 100'),
                offset:Joi.number().description('Pagination offset.')
            }
        }),
        handler: function(req, reply){
            var params = {
                hotelId: req.params.hotelId,
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                offset: typeof req.query.offset != "undefined" ? req.query.offset : 0
            }
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