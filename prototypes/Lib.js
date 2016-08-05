"use strict";

const mongojs = require("mongojs");
const config  = require("../config.js");
const paginate = require("../lib/paginate");
const debug = require("debug")("api:prototypes:Lib");

const SPECIALDOM_DB = "heroku_94wh3cp2";
const CHECKOUT_DB = "heroku_94wh3cp2";

//MongoDB Databases
const dbs = {
    specialdom: mongojs(config.dbs[SPECIALDOM_DB].stringconn, config.dbs[SPECIALDOM_DB].collections),
    checkout: mongojs(config.dbs[CHECKOUT_DB].stringconn, config.dbs[CHECKOUT_DB].collections)
};

var promises = [];
for(var key in dbs){
    let db = dbs[ key ];
    promises.push( paginate(db,{}) );
}
Promise.all(promises)
    .then( () => debug("pagination loaded"),
           () => debug("ERROR: pagination loaded failed "));
/**
 * Prototype base para todas las Lib que quieran acceder a la base de datos.
 *
 * Para implementar utilizar
 * @example
 * utils.inherits(MyLib,Lib);
 *
 * @module Lib
 * @returns {*}
 *
 */
class Lib {

    /**
     * Retorna la db utilizando la lib mongojs.
     *
     * @param {string=} name nombre de la base de datos.
     * @returns {object} mongojs db object
     */
    getDB(name){
        return dbs[ name || "specialdom" ];
    }
}

module.exports = Lib;
