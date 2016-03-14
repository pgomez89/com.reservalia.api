"use strict";

/**
 * API Reservalia
 *
 * @author Oscar López
 * @team Reservalia
 * @tupapá
 **/


const Hapi = require("hapi");

//Hapi Plugins
const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');


const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

//Database Driver
const mongojs = require("mongojs");

require("./routes/routes.js")(server);

const options = {
    info: {
        'title': 'Reservalia API Documentation',
        'version': "v1.0.0"
    }
};

server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
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


