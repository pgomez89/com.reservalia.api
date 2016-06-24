"use strict";


const Joi = require('joi');
const sales = require("../controllers/salesController.js");
const Boom = require("boom");
const statusCodes = require("../utils/statusCode.js");
const debug = require("debug")("routes");
/**
 *
 * Sales contiene los endpoints de /sales.
 *
 * Cada endpoint tiene como referencia uno o mas controller que continen la lógica para armar los responses.
 *
 * Sales pertenece a la capa routes, cada vez que creo un objeto en la capa routes, tengo que setear quien es
 * su prototipo. Utilizando utils.inherits(MiClase,Prototype). Luego exportar el objeto, en este caso Sales
 *
 * @class
 * @param {object} server Hapi Server
 */
function Sales(server){

    /**
     * /sales o /v1/sales
     *
     * Endpoint para resolver todos las ventas(de cualquier hotel) de reservalia.
     *
     * @function
     * @param {!number} limit required  -  Limite de items por página
     * @param {!number} page required -  Desvio, 0, 1, 2 -> page 0 limit 10, es de 0 a 10, page 1 limit 10, es de 10 a 20...n
     * @param {string=} sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date(ordena por el campo lastModified), -total-price,+total-price
     * @param {string=} filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date,template,logo,domains)
     *
     * @response err
     * @response hotels
     */
    server.route({
        method:"GET",
        path:"/v1/sales",
        config: Sales.prototype.buildConfig({
            query: {
                limit: Joi.number().required().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                page:Joi.number().required().min(1).max(100).integer().description('Pagination page. Min 1'),
                sort: Joi.string().description("Sort Options. +ASC -DESC +date -date(ordena por el campo lastModified), +total-price -total-price, +nightly-price -nightly-price"),
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/sales']),
        handler: function(req, reply){
            debug("sales init");
            let params = {
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                page: typeof req.query.page != "undefined" ? req.query.page : 1,
                filter: req.query.filter,
                sort: req.query.sort
            };

            sales.getSales(params,(err,sales) => {
                if(err)
                    return reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/sales');

                debug("sales response");
                return reply(sales).header('X-Service','/v1/sales');
            });
        }
    });

    /**
     * /sales/{hotelId} o /v1/sales/{hotelId}
     *
     * Endpoint para resolver todos las ventas de un hotel en particular de reservalia.
     *
     * @param hotelId Número de hotel a filtrar
     *
     * @param limit required  -  Limite de items por página
     * @param page required -  Desvio, 0, 1, 2 -> page 0 limit 10, es de 0 a 10, page 1 limit 10, es de 10 a 20...n
     * @param sort optional   -  Criterios de ordenamiento, +ASC, -DESC -date,+date(ordena por el campo lastModified), -total-price,+total-price
     * @param filter optional -  Sólo incluye las propiedades que se espcifican en el filter (date,template,logo,domains)
     *
     * @response err
     * @response hotels
     */
    server.route({
        method:"GET",
        path:"/v1/sales/{hotelId}",
        config: Sales.prototype.buildConfig({
            params:{
                hotelId: Joi.number().required().description("Hotel ID")
            },
            query: {
                limit: Joi.number().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                page:Joi.number().min(1).max(100).integer().description('Pagination page. Min 1'),
                sort: Joi.string().description("Sort Options. +ASC -DESC +date -date(ordena por el campo lastModified), +total-price -total-price, +nightly-price -nightly-price"),
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/sales/{hotelId}']),
        handler: function(req, reply){
            let params = {
                hotelId: req.params.hotelId,
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                page: typeof req.query.page != "undefined" ? req.query.page : 1,
                filter: req.query.filter,
                sort: req.query.sort
            };
            sales.getSalesByHotelId(params,(err,sales) => {
                if(err)
                    return reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/sales/{hotelId}');
                return reply(sales).header('X-Service','/v1/sales/{hotelId}');
            });
        }
    });

    server.route({
        method:"GET",
        path:"/badrequest",
        handler:function(req,reply){
            reply(Boom.badRequest("anda como el oejte"));
        }
    })
}

Sales.prototype = require("../prototypes/Endpoint.js");
module.exports = Sales;