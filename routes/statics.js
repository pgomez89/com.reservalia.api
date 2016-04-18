"use strict";

const Path = require("path");
/**
 * @class
 * @param {object} server Hapi Server
 */
function Statics(server){
    //JS DOC 3. Se compila con gulp
    server.route({
        method: 'GET',
        path: '/jsdocs/{param*}',
        handler: {
            directory: {
                path: Path.resolve(__dirname,'../public/docs'),
                redirectToSlash: false,
                index: true
            }
        }
    });

}

module.exports = Statics;