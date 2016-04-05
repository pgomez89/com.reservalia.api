"use strict";

/**
 * PRODUCTION ENV
 *
 * NewRelic configuration, server host, DB's, api host.
 */

const newrelic = {
    /**
     * Array of application names.
     */
    app_name: ['Reservalia API'],
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
        level: 'info'
    }
};

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
    },
    newrelic:newrelic
};

module.exports = config;