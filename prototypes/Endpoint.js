"use strict";


/**
 *
 * Prototype base para todos los Endpoints
 *
 * Para implementar utilizar
 *
 * utils.inherits(MyEndpoint,Endpoint);
 *
 * @returns {*}
 * @constructor
 */
function Endpoint(){

    return {
        /**
         *
         * BuildConfig es obligatorio en cada endpoint si se quiere validar los path/query params, y si se quiere agregar a swagger
         *
         * @param validate
         * @returns {{plugins: {hapi-swagger: {responses: {400: {description: string}, 200: {description: string}}, payloadType: string}}, validate: *, tags: string[]}}
         */
        buildConfig(validate){
            let config = {
                plugins: {
                    'hapi-swagger': {
                        responses: {'400': {'description': 'Bad Request'},'200':{'description':'ok'}},
                        payloadType: 'json'
                    }
                },
                validate:validate,
                tags: ['api']
            };

            return config;
        }
    }
}

module.exports = new Endpoint();