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

    //more endpoints here
}

Hotels.prototype = require("../prototypes/Endpoint.js");

module.exports = Hotels;
