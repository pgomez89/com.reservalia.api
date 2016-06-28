"use strict";

const mongojs = require("mongojs");
const config  = require("../config.js");
const paginate = require("../lib/paginate");
const debug = require("debug")("api:prototypes:Lib");

const SPECIALDOM_DB = "specialdom";
const CHECKOUT_DB = "checkout";

//MongoDB Databases
const dbs = {
    specialdom: { db: mongojs(config.dbs[SPECIALDOM_DB].stringconn, config.dbs[SPECIALDOM_DB].collections),pagination:false },
    checkout: {   db: mongojs(config.dbs[CHECKOUT_DB].stringconn, config.dbs[CHECKOUT_DB].collections), pagination:false }
};

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

    constructor(){
        for(var key in dbs){
            let db = dbs[ key ];
            if(! db.pagination){
                debug("Adding Pagination to DB "+key);
                paginate(db.db,config.dbs[key].collections,{});
                db.pagination = true;
            }
        }
    }

    /**
     * Retorna la db utilizando la lib mongojs.
     *
     * @param {string=} name nombre de la base de datos.
     * @returns {object} mongojs db object
     */
    getDB(name){
        return dbs[ name || "specialdom" ].db;
    }
}

module.exports = Lib;