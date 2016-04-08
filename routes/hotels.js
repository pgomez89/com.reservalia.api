"use strict";

const Joi = require('joi');
const hotels = require("../controllers/hotelsController.js");

/**
 *
 * Hotels contiene los endpoints de /hotels
 *
 * Cada endpoint tiene como referencia uno o mas controller que continen la lógica para armar los responses.
 *
 * Hotels pertenece a la capa routes, cada vez que creo un objeto en la capa routes, tengo que setear quien es
 * su prototipo. Utilizando utils.inherits(MiClase,Prototype). Luego exportar el objeto, en este caso Hotels
 *
 * @class
 * @param server Hapi Server
 */
function Hotels(server){

    //Endpoint
    /**
     * /hotels o /v1/hotels
     *
     * Endpoint para resolver todos los hoteles de reservalia.
     *
     * @function
     * @param {!number} limit required  -  Limite de items por página
     * @param {!number} offset required -  Desvio, 0, 1, 2 -> offset 0 limit 10, es de 0 a 10, offset 1 limit 10, es de 10 a 20...n
     * @param {string=} sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date (ordena por el campo lastModified), -total-price,+total-price
     * @param {string=} filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date,template,logo,domains)
     * @param {boolean=} reduce optional -  Devuelve una version reducida del objeto hotel.
     *
     * @response err
     * @response hotels
     */
    server.route({
        method: 'GET',
        path: '/v1/hotels',
        config: Hotels.prototype.buildConfig({
            query:{
                limit: Joi.number().required().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                offset:Joi.number().required().min(0).max(100).integer().description('Pagination offset. '),
                sort: Joi.string().description("Sort Options. +ASC -DESC +date -date(ordena por el campo lastModified), +total-price -total-price, +nightly-price -nightly-price"),
                filter: Joi.string().description("Filter Options: name, template, logo, domains, online. If you don't put anything, by default API retrieves you the reduce version of sale"),
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
                    return reply(err).header('X-Service','/v1/hotels');
                return reply(hotel).header('X-Service','/v1/hotels');
            });
        }
    });

    /**
     * /hotels/{hotelId} o /v1/hotels/{hotelId}
     *
     * Endpoint para resolver un los hotel de reservalia.
     *
     * @function
     *
     * @param hotelId Número de hotel a filtrar
     *
     * @param {string=} sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date(ordena por el campo lastModified), -total-price,+total-price
     * @param {string=} filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date(lastModified),template,logo,domains)
     * @param {boolean=} reduce optional - Devuelve una version reducida del objeto hotel.
     *
     * @response err
     * @response hotel
     */
     
    server.route({
        method: 'GET',
        path: '/v1/hotels/{hotelId}',
        config: Hotels.prototype.buildConfig({
            params: {

                // Tiene que coincidir el Path Param con el params del objeto Validate.
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
                    return reply(err).header('X-Service','/v1/{hotelId}');
                return reply(hotel).header('X-Service','/v1/{hotelId}');
            });
        }
    });

    //Tiene que coincidir el path param con el params del objeto validate.
    /**
     * /hotels/online o /v1/hotels/online
     *
     * Endpoint para resolver todos los hoteles ONLINE de reservalia.
     *
     * @function
     * @param {!number} limit required  -  Limite de items por página
     * @param {!number} offset required -  Desvio, 0, 1, 2 -> offset 0 limit 10, es de 0 a 10, offset 1 limit 10, es de 10 a 20...n
     * @param {string=} sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date(ordena por el campo lastModified), -total-price,+total-price
     * @param {string=} filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date(lastModified),template,logo,domains)
     * @param {boolean=} reduce optional -  Devuelve una version reducida del objeto hotel.
     *
     * @response err
     * @response hotels
     */
    server.route({
        method: 'GET',
        path: '/v1/hotels/online',
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
            hotels.getHotelsOnline(params,(err,hotel) => {
                if(err)
                    return reply(err).header('X-Service','/v1/hotels/online');
                return reply(hotel).header('X-Service','/v1/hotels/online');
            });
        }
    });



    //more endpoints here
}

Hotels.prototype = require("../prototypes/Endpoint.js");

module.exports = Hotels;
