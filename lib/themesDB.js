"use strict";

const Lib = require("../prototypes/Lib");
const DB = "specialdom";
/**
 * ThemesDB es una lib que accede a la base de datos que contiene los themes y colors de reservalia.
 *
 * ThemesDB pertence a la capa lib y como tal debe extender del prototype Lib.
 *
 * Cada Lib tiene acceso a acceder a cualquier db dentro del sistema.
 *
 * @class
 * @returns {{getHotels: (function(*, *=, *=, *=)), getHotelById: (function(*, *=, *, *=)), getHotelsOnline: (function(*, *=, *=, *=))}}
 * @constructor
 */
class ThemesDB extends Lib {

    /**
     * Retorna todos los themes
     * @method
     * @memberof HotelsDB
     *
     */
    getThemes(){
        return new Promise( (resolve,reject)=>{
            super.getDB(DB).themes.find({},function(err,themes){
                err ? reject(err): resolve(themes);
            });
        });
    }
    /**
     *
     * Retorna todos los colores de los themes
     * @method
     * @memberof HotelsDB
     *
     */
    getColors(){
        return new Promise( (resolve,reject) => {
            super.getDB(DB).colors.find({},function(err,colors){
                err ? reject(err) : resolve(colors);
            });
        })
    }
}

module.exports = new ThemesDB();