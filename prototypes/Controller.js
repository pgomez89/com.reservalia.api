"use strict";


function Controller(){

    var sorting = require("../sorting/Sorting.js");
    var filter = require("../filters/Filter.js");
    return {
        getSort(map,params){
            return sorting(map,params);
        },
        getFilter(map,filters){
            return filter(map,filters);
        }

    }
}

module.exports = new Controller();