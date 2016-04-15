"use strict";

const Boom = require("boom");

module.exports = (function () {

    return {
        do: function(err,data) {
            if(err){
                var error = Boom.create( Math.trunc(Number(err.output.statusCode / 1000) ), err.output.message);
                error.output.payload = err.output;
                return error;
            }else{
                return data;
            }
        }
    }
})();