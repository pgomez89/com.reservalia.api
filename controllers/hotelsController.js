"use strict";
const hotels = require("../lib/hotelsDB.js");
const Errors = require("../lib/errors.js");
/**
 * HotelCtrl es un controller que maneja la lógica de los objetos de hotels.
 *
 * Cada controller posee libs asociadas que permiten acceder a la base de datos u otros servicios.
 *
 * HotelCtrl pertenece a la capa controllers, cada vez que creo un objeto en la capa controllers, tengo que setear quien es
 * su prototipo. Utilizando utils.inherits(MiClase,Prototype). Luego exportar el objeto, en este caso HotelCtrl
 *
 *
 * @class
 * @returns {{getHotels: (function(*=, *)), getHotelById: (function(*=, *)), getHotelsOnline: (function(*=, *))}}
 *
 */
var HotelCtrl = function(){

    var _this = this;

    /**
     *
     * @type {{id: string, name: string, template: string, logo: string, domains: string, emails: string, phones: string}}
     */
    var mapFilter = {
        id:"_id",
        name:"general.hotel_name",
        template:"template",
        logo:"template.pictures.logoUrl",
        domains:"general.domains",
        emails:"general.emails",
        phones:"general.phones"
    };

    /**
     *
     * @type {{id: string, name: string}}
     */
    var mapSorting = {
        id:"_id",
        name:"general.hotel_name"
    };


    /**
     *
     * Transforma un hotel de la base de datos al hotel que viaja en el response.
     *
     * @param hotelRaw - Objeto tal cual viene de la base de datos.
     * @returns {{id: *, name: (*|string), demoUrl: string}}
     */
    function buildHotel(hotelRaw){
        //Siempre va a response un hotel con este modelo base.
        let hotel = {
            id: hotelRaw._id,
            name:hotelRaw.general.hotel_name || "",
            demoUrl: "http://"+hotelRaw._id+".reservalia.com"
        };

        if(hotelRaw.general && hotelRaw.general.domains && hotelRaw.general.domains.length > 0){
            let domain =  hotelRaw.general.domains[0].domain;

            if(domain){
                let url = "http://www."+domain;
                hotel.url = url.trim();

                if(hotelRaw.template && hotelRaw.template.pictures && hotelRaw.template.pictures.logoUrl){
                    hotel.logo = url.trim()+"/"+hotelRaw.template.pictures.logoUrl.trim();
                }

                if(hotelRaw.template){
                    hotel.template = {
                        id: hotelRaw.template.id,
                        name: hotelRaw.template.path,
                        css: hotel.url+hotelRaw.template.css
                    };
                }
            }
            //Puede ser que sea online
            hotel.domains = hotelRaw.general.domains
        }



        if(typeof hotelRaw.general.emails != "undefined"){
            hotel.emails = hotelRaw.general.emails;
        }

        if(typeof hotelRaw.general.phones != "undefined"){
            hotel.phones = hotelRaw.general.phones;
        }
        return hotel;
    }


    return {

        /**
         *
         * Retorna todos los hotels teniendo en cuenta los filtros, ordenamiento y parámetros.
         *
         * @method
         * @memberof HotelCtrl
         *
         * @param {object} params
         * @param {HotelCtrl~getHotels} cb
         */
        getHotels(params,cb){

            if(typeof params.filter != "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            //TODO Cambiar a promises.
            hotels.getHotels(params,filters,sort,(err,hotelsRaw) => {
                if(err){
                    //No entregar data de errores de db al cliente. Solo loguearlas.
                    return cb(Errors.cannotAccess,null);
                }else{
                    //try{
                        if(hotelsRaw && hotelsRaw.length > 0){
                            //Transformo cada hotelRaw en un hotel para responder el request.
                            hotelsRaw = hotelsRaw.map( hotelRaw => {
                                return buildHotel(hotelRaw);
                            });
                            return cb(null,hotelsRaw);
                        }else{
                            return cb(null,{});
                        }
                    //}catch(err){
                    //    console.log(err);
                    //    return cb({err:"Error to processing request"},null);
                    //}
                }

                //Warning, acá no se llama a ningún callback porque están todas las alternativas cubiertas, si agregan otra
                //tenganlo en cuenta.

            });
        },
        /**
         *
         * Retorna un hotel por ID teniendo en cuenta los filtros, ordenamiento y parámetros.
         *
         * @method
         * @memberof HotelCtrl
         *
         * @param {object} params
         * @param {HotelCtrl~getHotelById} cb
         */
        getHotelById(params,cb){

            if(typeof params.filter != "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            hotels.getHotelById(params,filters,sort,(err, hotelRaw) => {
                if(err)
                    return cb(Errors.cannotAccess,null);
                try {
                    return cb(null,buildHotel(hotelRaw));
                }catch(err){
                    return cb(Errors.noHotel,null);
                }
            });
        },

        /**
         *
         * Retorna solo los hoteles online.(online: true) teniendo en cuenta los filtros, ordenamientos y paramétros.
         * @method
         * @memberof HotelCtrl
         * @param {object} params
         * @param {HotelCtrl~getHotelsOnline} cb
         */
        getHotelsOnline(params,cb){
            if(typeof params.filter != "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            hotels.getHotelsOnline(params,filters,sort,(err,hotelsRaw) => {
                if(err){
                    //No entregar data de errores de db al cliente. Solo loguearlas.
                    return cb(Errors.cannotAccess,null);
                }else{
                    //try{
                    if(hotelsRaw && hotelsRaw.length > 0){
                        hotelsRaw = hotelsRaw.map( hotelRaw => {
                            return buildHotel(hotelRaw);
                        });
                        return cb(null,hotelsRaw);
                    }else{
                        return cb(null,{});
                    }
                    //}catch(err){
                    //    console.log(err);
                    //    return cb({err:"Error to processing request"},null);
                    //}
                }

                //Warning, acá no se llama a ningún callback porque están todas las alternativas cubiertas, si agregan otra
                //tenganlo en cuenta.

            });
        }
    }
};

HotelCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new HotelCtrl();

/**
 * @callback HotelCtrl~getHotels
 * @param {object} err
 * @param {Array} sales
 **/
/**
 * @callback HotelCtrl~getHotelById
 * @param {object} err
 * @param {Array} sales
 **/
/**
 * @callback HotelCtrl~getHotelsOnline
 * @param {object} err
 * @param {Array} sales
 **/