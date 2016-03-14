"use strict";

module.exports = function(server){
    exports.hotels = require("./hotels")(server);
    exports.sales  = require("./sales")(server);
};



