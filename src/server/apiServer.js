const http = require('http');
const fs = require('fs');


/**
 * Starts the API for the logs.
 * @param {Number} port 
 * @param {Object} paths 
 */
function startAPI(port, paths) {
    http.createServer((req, res) => {
        switch(req.url) {
            case '/api/currentIP':
                fs.readFile(paths.currentIpFile, (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(JSON.stringify(err));
                    } else {
                        res.writeHead(200);
                        res.end(data);
                    }
                });
                break;
            case '/api/updatelog':
                fs.readFile(paths.ipUpdateLog, (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(JSON.stringify(err));
                    } else {
                        res.writeHead(200);
                        res.end(data);
                    }
                });
                break;
            case '/api/ddnssResponseLog':
                fs.readFile(paths.ddnssResponseLogFile, (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(JSON.stringify(err));
                    } else {
                        res.writeHead(200);
                        res.end(data);
                    }
                });
                break;
            default:
                res.writeHead(404);
                res.end(`Path: ${req.url} does not exist.`)
        }
    }).listen(port);
}

module.exports = startAPI;