const ipUpdater = require('./ipUpdate');
const { readConfig } = require('../helper');


const paths = {
    configFile:             __dirname + '/../config.json',
    currentIpFile:          __dirname + '/../iplogs/currentIp',
    ipUpdateLog:            __dirname + '/../iplogs/update.log.csv',
    ddnssResponseLogFile:   __dirname + '/../iplogs/ddnsServiceResponse.log'
};

(async function boot() {
    const serviceConfig = await readConfig(paths.configFile);

    ipUpdater(serviceConfig, paths);
})()

