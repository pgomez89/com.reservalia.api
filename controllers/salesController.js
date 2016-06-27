"use strict";

const sales = require("../lib/salesDB.js");
const Errors = require("../lib/errors.js");
/**
 *
 * SalesCtrl es un controller que maneja la lógica de los objetos de hotels.
 *
 * Cada controller posee libs asociadas que permiten acceder a la base de datos u otros servicios.
 *
 * SalesCtrl pertenece a la capa controllers, cada vez que creo un objeto en la capa controllers, tengo que setear quien es
 * su prototipo. Utilizando utils.inherits(MiClase,Prototype). Luego exportar el objeto, en este caso SalesCtrl
 *
 * @class
 *
 * @returns {{getSales: (function(*=, *=)), getSalesByHotelId: (function(*=, *=))}}
 * @constructor
 */
function SalesCtrl(){

    //Mapa donde la key = API path/query param y val = mongodb property
    var map = {
        booking_id:"booking_id",
        date: "lastModified",
        checkIn: "checkIn",
        checkOut: "checkOut",
        hotel: "hotelName",
        price: "price_detail.total",
        nightly_price:"price_detail.nightly_price"
    };

    var _this = this;

    return {
        /**
         * Retorna todas las ventas de forma paginada teniendo en cuenta los filtros, ordenamientos y parámetros.
         *
         * @method
         * @memberof SalesCtrl
         * @param {object} params
         * @param {SalesCtrl~getSalesDB} cb
         */
        getSales(params){
            let filters = _this.getFilter(map,params.filter);
            let sort = _this.getSort(map,params.sort);
            return sales.getSales(params,filters,sort);
        },
        /**
         * Retorna todas las ventas de un hotel en particular teniendo en cuenta los filtros, ordenamientos y parámetros.
         * @method
         * @memberof SalesCtrl
         * @param {object} params
         * @param {SalesCtrl~getSalesCBByHotelId} cb
         */
        getSalesByHotelId(params,cb){
            let filters = _this.getFilter(map,params.filter);
            let sort = _this.getSort(map,params.sort);
            return sales.getSales(params,filters,sort);
        }
    }
}


SalesCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new SalesCtrl();

/**
 * @callback SalesCtrl~getSalesCB
 * @param {object} err
 * @param {Array} sales
 **/
/**
 * @callback SalesCtrl~getSalesCBByHotelId
 * @param {object} err
 * @param {Array} sales
 **/