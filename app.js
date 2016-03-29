"use strict";

/**
 * API Reservalia
 *
 * @author Oscar López
 * @team Reservalia
 * @tupapá
 **/


require("newrelic");
const Hapi = require("hapi");

//Hapi Plugins
const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiApiVersion = require("hapi-api-version");

const config = require("./config.js");

const server = new Hapi.Server();

server.connection({
    host:"0.0.0.0",
    port: 9290,
    routes:{
        cors: {
            origin: ['*']
        }
    }
});

require("./routes/routes.js")(server);

const options = {
    info: {
        'title': 'Reservalia API Documentation',
        'version': "v1.0.0"
    },
    documentationPath:"/",
    host: config.api.host
};

server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    },
    {
        'register': HapiApiVersion,
        'options':{
            defaultVersion:1,
            validVersions:[1,2],
            vendorName:'reservalia'
        }
    },
    {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    }], (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }
    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});


