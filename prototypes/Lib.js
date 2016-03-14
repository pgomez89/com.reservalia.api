"use strict";

const mongojs = require("mongojs");
const config  = require("../config.js");

function Lib(){

    var dbs = {
        specialdom: mongojs(config.dbs["specialdom"].stringconn, config.dbs["specialdom"].collections),
        checkout: mongojs(config.dbs["checkout"].stringconn, config.dbs["checkout"].collections)
    };

    return {
        //TODO cuando soporte parametros por default, colocar name = "specialdom"
        getDB(name){
            return dbs[ name || "specialdom" ];
        }
    }
}

module.exports = new Lib();