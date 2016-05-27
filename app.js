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

const HapiApiVersion = require("hapi-api-version");
const authtoken = require("authtoken");

const config = require("./config.js");

const server = new Hapi.Server();

const args = require("argsparser").parse();

// Configs
const port = args["-port"] || config.port || 9290;  // Config application Port
const swaggerHost = config.api.host || "localhost:"+port;  // Config Swagger Host (shown in swagger front doc)

server.connection({
    host:"0.0.0.0",
    port,
    routes:{
        cors: {
            origin: ['*']
        }
    }
});

server.register([
    {
        register:require("./plugins/redirect"),
        options:{
            map:{ "/":"/docs"}
        }
    },
    authtoken.hapi,
    Inert,
    Vision,
    {
        register: require('hapi-swaggered'),
        options: {
            cors: true,
            host: swaggerHost,
            info: {
                title: 'Reservalia API',
                description: 'Powered by Despegar.com',
                version: '1.0'
            }
        }
    },
    {
        register: require('hapi-swaggered-ui'),
        options: {
            title: 'Reservalia API',
            path: '/docs',
            authorization: {
                field: 'apikey',
                scope: 'header', // header works as well
                placeholder: 'Enter your Api Key here'
            },
            swaggerOptions: {
                validatorUrl: null,
                docExpansion:"list"
            }
        }
    },

    {
        'register': HapiApiVersion,
        'options':{
            defaultVersion:1,
            validVersions:[1,2],
            vendorName:'reservalia',
            versionHeader:"x-api-version"
        }
    },
    {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events:{
                    log:"*",request:"*"
                }
            }]
        }
    }], (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    require("./routes/routes.js")(server);

    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
