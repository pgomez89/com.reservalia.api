"use strict";

const baseResponse = {
    '400': {
        'description': "Bad request - A client error (more detail in the 'message' section)"
    },
    '403':{
        'description':"API validation - The request was not authorized (more detail in the 'causes' section)"
    },
    '429':{
        'description':"API validation - Quota exceeded"
    },
    '500':{
        'description':"Internal error - An unexpected error (more detail in the 'causes' section)"
    },
    '200':{
        'description':'OK'
    }
};
/**
 *
 * Prototype base para todos los Endpoints
 *
 * Para implementar utilizar
 *
 * @example
 * utils.inherits(MyEndpoint,Endpoint);
 *
 * @module Endpoint
 * @returns {*}
 */
module.exports = (function Endpoint(){

    return {
        /**
         *
         * BuildConfig es obligatorio en cada endpoint si se quiere validar los path/query params, y si se quiere agregar a swagger
         *
         * @param {object} validate - Joi schema
         * @returns {{plugins: {hapi-swagger: {responses: {400: {description: string}, 200: {description: string}}, payloadType: string}}, validate: *, tags: string[]}}
         */
        buildConfig(validate,statusCodes,tags){
            let config = {
                plugins: {
                    'hapi-swagger': {
                        responses: statusCodes || baseResponse,
                        payloadType: 'json'
                    }
                },
                validate:validate,
                tags: tags || ['api']
            };

            return config;
        }
    }
})();

//module.exports = new Endpoint();