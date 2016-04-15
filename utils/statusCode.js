"use strict";


module.exports = function (server) {
    let responses = {};
    return server.table().forEach( route => responses[ route.path ] = {} );
};
