const http = require('http');
const fs = require('fs');



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