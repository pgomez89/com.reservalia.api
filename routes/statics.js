"use strict";

const Path = require("path");
const config = require("config");
const debug = require("debug")("api:static")
/**
 * @class
 * @param {object} server Hapi Server
 */
function Statics(server){
    //JS DOC 3. Se compila con gulp

    if(config && config.jsdoc && config.jsdoc.enable){
        server.route({
            method: 'GET',
            path: '/jsdocs/{param*}',
            handler: {
                directory: {
                    path: Path.resolve(__dirname,'../public/jsdocs'),
                    redirectToSlash: true,//Clave dejar el redirectToSlash
                    index: true
                }
            }
        });
    }

}

module.exports = Statics;