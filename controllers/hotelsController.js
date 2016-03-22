"use strict";
const hotels = require("../lib/hotelsDB.js");

var HotelCtrl = function(){

    var map = {
        id:"_id",
        name:"name",
        template:"template",
        logo:"template.pictures.logoUrl",
        domains:"general.domains"
    };

    var _this = this;

    return {

        getHotels(params,cb){
            let filters = _this.getFilter(map,params.filter);
            let sort = _this.getSort(map,params.sort);

            hotels.getHotels(params,filters,sort,(err,hotelsRaw) => {
                if(err){
                    console.log("hotelsController",err);
                    //No entregar data de errores de db al cliente. Solo loguearlas.
                    return cb({err:"Cannot connect to DB"},null);
                }else{
                    //try{
                        if(hotelsRaw && hotelsRaw.length > 0){

                            hotelsRaw = hotelsRaw.map( hotelRaw => {

                                let hotel = {
                                    id: hotelRaw._id,
                                    name:hotelRaw._id || "",
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
                                    }
                                    //Puede ser que sea online
                                    hotel.domains = hotelRaw.general.domains
                                }

                                if(hotelRaw.template){
                                    hotel.template = {
                                        id: hotelRaw.template.id,
                                        name: hotelRaw.template.path,
                                        css: hotelRaw.template.css
                                    };

                                }

                                return hotel;

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
            let filters = _this.getFilter(map,params.filter);
            let sort = _this.getSort(map,params.sort);

            hotels.getHotelById(params,filters,sort,(err, hotelRaw) => {
                if(err)
                    return cb(err,null);

                try {
                    let url = "http://www."+hotelRaw.general.domains[0].domain;

                    let hotel = {
                        id: hotelRaw._id,
                        name:hotelRaw._id || "",
                        url:url,
                        demoUrl: "http://"+hotelRaw._id+".reservalia.com",
                        template: {
                            id: hotelRaw.template.id,
                            name: hotelRaw.template.path,
                            css: hotelRaw.template.css
                        },
                        domains: hotelRaw.general.domains,
                        logo: url.trim()+"/"+hotelRaw.template.pictures.logoUrl.trim()
                    };

                    return cb(null,hotel);

                }catch(err){
                    return cb(err,null);
                }

                return cb({err:"No hotel"},null);

            });
        }
    }
};

HotelCtrl.prototype = require("../prototypes/Controller.js");
module.exports = new HotelCtrl();