"use strict";

const host = process.env.DB_HOST || "localhost";
const os = require("os");
const config = {
    dbs:{
        checkout: {
            stringconn: "mongodb://"+host+"/checkout",
            collections:["sales","checkoutLogs"]
        }
        ,specialdom: {
            stringconn: "mongodb://"+host+"/specialdom",
            collections:["hotels","config"]
        }
    },
    api:{
        host: os.hostname()+":9290"
    }
};

module.exports = config;