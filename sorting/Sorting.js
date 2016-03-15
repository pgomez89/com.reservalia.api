"use strict";


function Sorting(params){
    let parts = params.split(",");

    let dbSorting = {};

    for(var i = 0; i < parts.length; i++){
        let option = parts[i];
        let key = option.slice(1,option.length);
        dbSorting[key] =  option[0] == "+" ? 1 : -1;
    }
    return dbSorting;
}

module.exports = Sorting;

