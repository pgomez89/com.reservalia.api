"use strict";
const hotels = require("../lib/hotelsDB.js");
const Errors = require("../lib/errors.js");
const themes = require("../lib/themesDB.js");
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
    function buildHotel(parts){
        let { hotelRaw, colors } = parts;


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

                if(hotelRaw.template && hotelRaw.template.pictures){
                    if(hotelRaw.template.pictures.logoUrl){
                        hotel.logo = url.trim()+"/"+hotelRaw.template.pictures.logoUrl.trim();
                    }
                    if(hotelRaw.template.pictures.fotoHeader){
                        hotel.header = "http://media.staticontent.com/media/pictures/"+hotelRaw.template.pictures.fotoHeader[0].trim();
                    }
                }

                if(hotelRaw.template){
                    hotel.template = {
                        id: hotelRaw.template.id,
                        name: hotelRaw.template.path,
                        css: hotel.url+"/colors/"+hotelRaw.template.css
                    };
                    if(typeof colors !== "undefined" && colors.length > 0){
                        colors.some(color => {
                            if(color.file == hotelRaw.template.css){
                                hotel.template.colors = color.colors;
                                hotel.template.headerColor = color.colors[0];
                                return true;
                            }
                            return false;
                        });
                    }
                }
            }
            //Puede ser que sea online
            hotel.domains = hotelRaw.general.domains;
        }



        if(typeof hotelRaw.general.emails !== "undefined"){
            hotel.emails = hotelRaw.general.emails;
        }

        if(typeof hotelRaw.general.phones !== "undefined"){
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

            if(typeof params.filter !== "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            Promise.all([
                hotels.getHotels(params,filters,sort),
                themes.getColors()
            ]).then(
                function onFullfilled(responses){
                    let hotelsRaw = responses.shift();
                    let colors = responses.shift();

                    if(hotelsRaw && hotelsRaw.length > 0){
                        //Transformo cada hotelRaw en un hotel para responder el request.
                        hotelsRaw = hotelsRaw.map( hotelRaw => {
                            return buildHotel({
                                hotelRaw,
                                colors
                            });
                        });
                        return cb(null,hotelsRaw);
                    }else{
                        return cb(null,{});
                    }
                },
                function onRejected(err){
                    cb(Errors.cannotAccess,null);
                }
            );
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

            if(typeof params.filter !== "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            Promise.all([
                hotels.getHotelById(params,filters,sort),
                themes.getColors()
            ]).then(function onFullFilled(responses){
                let hotelRaw = responses.shift();
                let colors = responses.shift();
                return cb(null,buildHotel({ hotelRaw,colors}));

            }).catch(function onRejected(err){
                console.log(err);
                return cb(Errors.noHotel,null);
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
            if(typeof params.filter !== "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            Promise.all([
                hotels.getHotelsOnline(params,filters,sort),
                themes.getColors()
            ]).
            then(function onFullFilled(responses){
                let hotelsRaw = responses.shift();
                let colors = responses.shift();
                if(hotelsRaw && hotelsRaw.length > 0){
                    hotelsRaw = hotelsRaw.map( hotelRaw => {
                        return buildHotel({colors,hotelRaw});
                    });
                    return cb(null,hotelsRaw);
                }else{
                    return cb(null,{});
                }

            }).catch(function onRejected(err){
                console.log(err);
                return cb(Errors.noHotel,null);
            });
        }
    };
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
