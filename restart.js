"use strict";

const debug = require("debug")("api:pm2");
const cluster = "/etc/cluster.info";
const pm2 = require("pm2");
const fs = require("fs");

function restart(env) {
    debug("Starting PM2. NODE_ENV: "+env);

    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        let options = {
            name: "api",
            script: './app.js',         // Script to be run
            exec_mode: 'cluster',        // Allow your app to be clustered
            instances: 2                // Optional: Scale your app by 4
        };
        if(env){
            switch(env){
                case "bsas":
                    options.env = {
                        "NODE_ENV": "rc"
                    };
                    break;
                case "prod":
                    options.env = {
                        "NODE_ENV": "production"
                    };
                    break;
            }
        }

        debug("PM2: START OPTIONS"+JSON.stringify(options));
        pm2.restart(options, function (err, apps) {
            if (err){
                debug("Err: "+err);
                pm2.disconnect();   // Disconnect from PM2
                throw err;
            }
            debug("API STARTED");
            pm2.disconnect();
        });

    });
}

try{
    let info = fs.readFileSync(cluster).toString();
    let  clusterInfo = JSON.parse(info);
    let  env = clusterInfo.environment;
    restart(env);
}catch(err){
    debug("Error start: "+err);
    pm2.disconnect();
}





