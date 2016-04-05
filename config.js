"use strict";

/**
 * Este script corre al inicio del server. Según el ambiente en donde se configura, posee diferentes
 * archivos config que se encuentran en /envs.
 *
 * Para variar de ambiente, utilizar la variable de entorno NODE_ENV
 *
 * Default dev.
 *
 * @type {string|string|string}
 */

var env = process.env.NODE_ENV || "dev";
switch (env.toLowerCase()){
    case "dev":
        module.exports = require("./envs/dev.js");
        break;
    case "rc":
        module.exports = require("./envs/rc.js");
        break;
    case "cloudia":
        module.exports = require("./envs/cloudia.js");
        break;
    case "sandbox":
        module.exports = require("./envs/sandbox.js");
        break;
    case "production":
        module.exports = require("./envs/production.js");
        break;
    default:
        module.exports = require("./envs/dev.js");
        break;
}
