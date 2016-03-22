"use strict";


function Sorting(map,params){
    let dbSorting = {};
    if(params){
        let parts = params.split(",");

        parts.forEach( val => {
            val = val.trim();
            if(val[0] == "+")
                dbSorting[ map [ val.slice(1,val.length) ] ] = 1;
            if(val[0] == "-")
                dbSorting[ map [ val.slice(1,val.length) ] ] = -1;
        });
    }

    return dbSorting;
}

module.exports = Sorting;

