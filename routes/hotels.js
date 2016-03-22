"use strict";

const Joi = require('joi');
const hotels = require("../controllers/hotelsController.js");

function Hotels(server){

    server.route({
        method: 'GET',
        path: '/api/v1/hotels',
        config: Hotels.prototype.buildConfig({
            query:{
                limit: Joi.number().required().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                offset:Joi.number().required().min(0).max(100).integer().description('Pagination offset. '),
                sort: Joi.string().description("Sort Options. +ASC -DESC +date -date, +total-price -total-price, +nightly-price -nightly-price"),
                filter: Joi.string().description("Filter Options: name, template_id, template_css, template_path, logo, domains, online. If you don't put anything, by default API retrieves you the reduce version of sale"),
                reduce: Joi.boolean().description("Reduce version of Hotel")
            }
        }),
        handler: function (req, reply) {
            let params = {
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                offset: typeof req.query.offset != "undefined" ? req.query.offset : 0,
                filter: req.query.filter,
                sort: req.query.sort
            };
            hotels.getHotels(params,(err,hotel) => {
                if(err)
                    return reply(err);
                return reply(hotel);
            });
        }
    });

    //Tiene que coincidir el path param con el params del objeto validate.
    server.route({
        method: 'GET',
        path: '/api/v1/hotels/{hotelId}',
        config: Hotels.prototype.buildConfig({
            params: {
                hotelId: Joi.number().required().description('Hotel ID from PAM')
            },
            query:{
                filter: Joi.string().description("Filter Options: TODO put fields here. If you don't put anything, by default API retrieves you the reduce version of sale"),
                reduce: Joi.boolean().description("Reduce version of Hotel")
            }
        }),
        handler: function (req, reply) {
            let params = {
                hotelId: req.params.hotelId,
                filter:req.query.filter,
                reduce: req.query.reduce
            };
            hotels.getHotelById(params,(err,hotel) => {
                if(err)
                    return reply(err);
                return reply(hotel);
            });
        }
    });

    //more endpoints here
}

Hotels.prototype = require("../prototypes/Endpoint.js");

module.exports = Hotels;
