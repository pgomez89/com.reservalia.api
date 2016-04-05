"use strict";

module.exports = function(server){
    require("./hotels")(server);
    require("./sales")(server);
};



