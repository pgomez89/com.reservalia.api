"use strict";

const Boom = require("boom");
const debug = require("debug")("response");

module.exports = (function () {

    return {
        do: function(reply,err,data,path) {
            if(err){
                debug("Creando boom");
                let error = Boom.create( Math.trunc(Number(err.output.statusCode / 1000) ), err.output.message);
                error.output.payload = err.output;
                debug("return error",error);
                error.output.headers['X-Service'] = path;
                return reply(error);
            }else{
                return reply(data).header('x-service',path);
            }
        }
    }
})();