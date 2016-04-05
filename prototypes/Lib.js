"use strict";

const mongojs = require("mongojs");
const config  = require("../config.js");

/**
 * Prototype base para todas las Lib que quieran acceder a la base de datos.
 *
 *  Para implementar utilizar
 *
 *  utils.inherits(MyLib,Lib);
 *
 * @returns {*}
 * @constructor
 */
function Lib(){

    //MongoDB Databases
    var dbs = {
        specialdom: mongojs(config.dbs["specialdom"].stringconn, config.dbs["specialdom"].collections),
        checkout: mongojs(config.dbs["checkout"].stringconn, config.dbs["checkout"].collections)
    };

    return {
        //TODO cuando soporte parametros por default, colocar name = "specialdom"
        /**
         * Retorna la db utilizando la lib mongojs.
         * @param name nombre de la base de datos.
         * @returns {*}
         */
        getDB(name){
            return dbs[ name || "specialdom" ];
        }
    }
}

module.exports = new Lib();