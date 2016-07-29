"use strict";

module.exports = function(server){
    require("./hotels")(server);
    require("./sales")(server);
    require("./statics")(server);
    require("./metrics")(server);
};



