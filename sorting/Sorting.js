"use strict";


function Sorting(map,params){
    let parts = params.split(",");

    let dbSorting = {};

    parts.forEach( val => {
        if(val[0] == "+")
            dbSorting[ map [ val.slice(1,val.length) ] ] = 1;
        if(val[0] == "-")
            dbSorting[ map [ val.slice(1,val.length) ] ] = -1;
    });
    return dbSorting;
}

module.exports = Sorting;

