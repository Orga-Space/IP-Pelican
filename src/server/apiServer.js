const http = require('http');
const fs = require('fs');


/**
 * Starts the API for the logs.
 * @param {Number} port 
 * @param {String} logFilePath 
 */
function startAPI(port, logFilePath) {
    http.createServer((req, res) => {
        fs.readFile(logFilePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify(err));
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }).listen(port);
}

module.exports = startAPI;