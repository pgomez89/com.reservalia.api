"use strict";

var env = process.env.NODE_ENV || "rc";
switch (env.toLowerCase()){
    case "rc":
        module.exports = require("./envs/rc.js");
        break;
    case "sandbox":
        module.exports = require("./envs/sandbox.js");
        break;
    case "production":
        module.exports = require("./envs/production.js");
        break;
    default:
        module.exports = require("./envs/rc.js");
        break;
}