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
 * @param server Hapi Server
 * @constructor
 */
function Hotels(server){

    //Endpoint
    /**
     * /hotels o /v1/hotels
     *
     * Endpoint para resolver todos los hoteles de reservalia.
     *
     * @param limit required  -  Limite de items por página
     * @param offset required -  Desvio, 0, 1, 2 -> offset 0 limit 10, es de 0 a 10, offset 1 limit 10, es de 10 a 20...n
     * @param sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date, -total-price,+total-price
     * @param filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date,template,logo,domains)
     * @param reduce optional -  Devuelve una version reducida del objeto hotel.
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
                sort: Joi.string().description("Sort Options. +ASC -DESC +date -date, +total-price -total-price, +nightly-price -nightly-price"),
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
                    return reply(err);
                return reply(hotel);
            });
        }
    });

    /**
     * /hotels/{hotelId} o /v1/hotels/{hotelId}
     *
     * Endpoint para resolver un los hotel de reservalia.
     *
     * @param hotelId Número de hotel a filtrar
     *
     * @param sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date, -total-price,+total-price
     * @param filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date,template,logo,domains)
     * @param reduce optional -  Devuelve una version reducida del objeto hotel.
     *
     * @response err
     * @response hotel
     */
    //Tiene que coincidir el path param con el params del objeto validate.
    server.route({
        method: 'GET',
        path: '/v1/hotels/{hotelId}',
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

    //Tiene que coincidir el path param con el params del objeto validate.
    /**
     * /hotels/online o /v1/hotels/online
     *
     * Endpoint para resolver todos los hoteles ONLINE de reservalia.
     *
     * @param limit required  -  Limite de items por página
     * @param offset required -  Desvio, 0, 1, 2 -> offset 0 limit 10, es de 0 a 10, offset 1 limit 10, es de 10 a 20...n
     * @param sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date, -total-price,+total-price
     * @param filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date,template,logo,domains)
     * @param reduce optional -  Devuelve una version reducida del objeto hotel.
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
                    return reply(err);
                return reply(hotel);
            });
        }
    });



    //more endpoints here
}

Hotels.prototype = require("../prototypes/Endpoint.js");

module.exports = Hotels;
