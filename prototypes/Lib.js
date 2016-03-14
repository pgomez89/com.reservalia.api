"use strict";

const mongojs = require("mongojs");

function Lib(){

    var dbs = {
        specialdom: mongojs("mongo.aws:27017/specialdom",["hotels","config"]),
        checkout: mongojs("mongo.aws:27017/specialdom",["hotels","config"])
    };

    return {
        //TODO cuando soporte parametros por default, colocar name = "specialdom"
        getDB(name){
            return dbs[ name || "specialdom" ];
        }
    }
}

module.exports = new Lib();