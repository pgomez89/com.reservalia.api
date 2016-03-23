"use strict";

const host = process.env.DB_HOST || "localhost";

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
        host: "api.reservalia.com"
    }
};

module.exports = config;