"use strict";


const Joi = require('joi');
const metrics = require("../controllers/metricsController.js");
const Boom = require("boom");
const statusCodes = require("../utils/statusCode.js");
const debug = require("debug")("api:routes:metrics");

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
function Metrics(server){

    server.route({
        method:"GET",
        path:"/v1/metrics/getTotalSales",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getTotalSales !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getTotalSales(params)
                .then( sales => reply(sales).header('X-Service','/v1/metrics/getTotalSales'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getTotalSales'));
        }
    });

    server.route({
        method:"GET",
        path:"/v1/metrics/getSalesOK",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getSalesOK !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getSalesOK(params)
                .then( sales => reply(sales).header('X-Service','/v1/metrics/getSalesOK'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getSalesOK'));
        }
    });

    server.route({
        method:"GET",
        path:"/v1/metrics/getSalesWithBookingStatus",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getSalesWithBookingStatus !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getSalesWithBookingStatus(params)
                .then( sales => reply(sales).header('X-Service','/v1/metrics/getSalesWithBookingStatus'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getSalesWithBookingStatus'));
        }
    });

    server.route({
        method:"GET",
        path:"/v1/metrics/getTotalErrors",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getTotalErrors !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getTotalErrors(params)
                .then( errors => reply(errors).header('X-Service','/v1/metrics/getTotalErrors'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getTotalErrors'));
        }
    });

    server.route({
        method:"GET",
        path:"/v1/metrics/getUnknownErrors",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getUnknownErrors !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getUnknownErrors(params)
                .then( errors => reply(errors).header('X-Service','/v1/metrics/getUnknownErrors'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getUnknownErrors'));
        }
    });

    server.route({
        method:"GET",
        path:"/v1/metrics/getErrorsWithBookingStatus",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getErrorsWithBookingStatus !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getErrorsWithBookingStatus(params)
                .then( errors => reply(errors).header('X-Service','/v1/metrics/getErrorsWithBookingStatus'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getErrorsWithBookingStatus'));
        }
    });

    server.route({
        method:"GET",
        path:"/v1/metrics/getTotalAttemps",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getTotalAttemps !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getTotalAttemps(params)
                .then( total => reply(total).header('X-Service','/v1/metrics/getTotalAttemps'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getTotalAttemps'));
        }
    });

    server.route({
        method:"GET",
        path:"/v1/metrics/getTotalTokens",
        config: Metrics.prototype.buildConfig({
            query: {
                filter: Joi.string().description("Filter Options: booking_id, date(lastModified), checkIn, checkOut, hotelName, price_detail. If you don't put anything, by default API retrieves you the reduce version of sale")
            }
        },statusCodes['/v1/metrics'],
        ['api','metrics']),
        handler: function(req, reply){
            debug("metrics getTotalTokens !!!");

            let params = {
                filter: req.query.filter
            };
            metrics.getTotalTokens(params)
                .then( total => reply(total).header('X-Service','/v1/metrics/getTotalTokens'))
                .catch(err => reply(Boom.badImplementation("HTTP Error 500")).header('X-Service','/v1/metrics/getTotalTokens'));
        }
    });
}

Metrics.prototype = require("../prototypes/Endpoint.js");
module.exports = Metrics;