"use strict";

var mongojs = require("mongojs");
var hotelsDB = require("../../lib/hotelsDB.js");

var db = mongojs("localhost:27017/specialdom", ["config"]);
require("../../lib/paginate.js")(db).then(function(){
    console.log("pagination loaded");
    test2();
});

function test() {
    var q = {};
    db.config.paginate(q,{},{page: 1, limit: 10}).then(function(docs){
        console.log(docs);
    }).catch(function(err){
        console.log(err);
    });
}

function test2(){
    Promise.all([
        hotelsDB.getHotels({"limit":10,"page":1},{},{})
    ]).then(function(result){
        console.log(result);
    }).catch(function(err){
        console.log(err);
    })
}
