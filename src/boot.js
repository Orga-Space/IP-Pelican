const ipUpdater = require('./ipUpdate');
const startAPI = require('./server/apiServer');
const { readConfig } = require('../helper');


const paths = {
    configFile:             __dirname + '/../config.json',
    currentIpFile:          __dirname + '/../iplogs/currentIp',
    ipUpdateLog:            __dirname + '/../iplogs/update.log.csv',
    ddnssResponseLogFile:   __dirname + '/../iplogs/ddnsServiceResponse.log'
};

(async function boot() {
    const serviceConfig = await readConfig(paths.configFile);

    await ipUpdater(serviceConfig, paths);

    if (serviceConfig.apiServer.enable) startAPI(serviceConfig.apiServer.port, paths.ipUpdateLog);
})()

