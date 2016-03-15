"use strict";

const Joi = require('joi');
const hotels = require("../controllers/hotelsController.js");


function Hotels(server){
    //Tiene que coincidir el path param con el params del objeto validate.
    server.route({
        method: 'GET',
        path: '/api/v1/hotels/{hotelId}',
        config: Hotels.prototype.buildConfig({
            params: {
                hotelId: Joi.number().required().description('Hotel ID from PAM')
            },
            query:{
                limit: Joi.number().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                offset:Joi.number().min(0).max(100).integer().description('Pagination offset.'),
                reduce: Joi.boolean().description("Reduce version of Hotel")
            }
        }),
        handler: function (request, reply) {
            hotels.getHotelById(request.params,(err,hotel) => {
                if(err)
                    return reply(err);
                return reply(hotel);
            });
        }
    });
}

Hotels.prototype = require("../prototypes/Endpoint.js");

module.exports = Hotels;
