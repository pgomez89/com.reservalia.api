"use strict";

const newrelic = {
    /**
     * Array of application names.
     */
    app_name: ['Reservalia API STAGE'],
    /**
     * Your New Relic license key.
     */
    license_key: '1a1160c5e624c2dcaf6c6a91f4f5dae30d22abee',
    logging: {
        /**
         * Level at which to log. 'trace' is most useful to New Relic when diagnosing
         * issues with the agent, 'info' and higher will impose the least overhead on
         * production applications.
         */
        level: 'trace'
    }
};

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
    },
    newrelic: newrelic
};

module.exports = config;