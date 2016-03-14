"use strict";

function Endpoint(){


    return {
        buildConfig(validate){
            let config = {
                plugins: {
                    'hapi-swagger': {
                        responses: {'400': {'description': 'Bad Request'},'200':{'description':'ok'}},
                        payloadType: 'json'
                    }
                },
                validate:validate || {},
                tags: ['api']
            };

            return config;
        }
    }
}

module.exports = new Endpoint();