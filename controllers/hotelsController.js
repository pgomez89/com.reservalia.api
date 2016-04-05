"use strict";
const hotels = require("../lib/hotelsDB.js");

var HotelCtrl = function(){

    var _this = this;

    var mapFilter = {
        id:"_id",
        name:"general.hotel_name",
        template:"template",
        logo:"template.pictures.logoUrl",
        domains:"general.domains",
        emails:"general.emails",
        phones:"general.phones"
    };

    var mapSorting = {
        id:"_id",
        name:"general.hotel_name"
    };


    function buildHotel(hotelRaw){
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

        getHotels(params,cb){

            if(typeof params.filter != "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            hotels.getHotels(params,filters,sort,(err,hotelsRaw) => {
                if(err){
                    console.log("hotelsController",err);
                    //No entregar data de errores de db al cliente. Solo loguearlas.
                    return cb({err:"Cannot connect to DB"},null);
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
        },
        getHotelById(params,cb){

            if(typeof params.filter != "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            hotels.getHotelById(params,filters,sort,(err, hotelRaw) => {
                if(err)
                    return cb(err,null);
                try {
                    return cb(null,buildHotel(hotelRaw));
                }catch(err){
                    return cb(err,null);
                }

                return cb({err:"No hotel"},null);

            });
        },

        getHotelsOnline(params,cb){
            if(typeof params.filter != "undefined"){
                params.filter += ",id,name";//Require Fields -> cambiar no me gusta
            }

            let filters = _this.getFilter(mapFilter,params.filter);
            let sort = _this.getSort(mapSorting,params.sort);

            hotels.getHotelsOnline(params,filters,sort,(err,hotelsRaw) => {
                if(err){
                    console.log("hotelsController",err);
                    //No entregar data de errores de db al cliente. Solo loguearlas.
                    return cb({err:"Cannot connect to DB"},null);
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