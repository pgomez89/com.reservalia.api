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

const host = "bigote:bigote@ds145295.mlab.com:45295";

const config = {
    dbs:{
        checkout: {
            stringconn: "mongodb://"+host+"/heroku_94wh3cp2",
            collections:["sales","checkoutLogs"]
        }
        ,specialdom: {
            stringconn: "mongodb://"+host+"/heroku_94wh3cp2",
            collections:["hotels","config","colors"]
        }
    },
    api:{
        host: "api.reservalia.com"
    },
    port:9290,
    newrelic:newrelic
};

module.exports = config;
