const fs = require('fs');
const https = require('https');

/**
 * Returns the date with time in format YYYY-(M)M-(D)D (T)T:(M)M
 * @returns {String}
 */
function getFormatedDate() {
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1).toString().padStart(2, '0') + '-' + current.getDate().toString().padStart(2, '0');
  let cTime = current.getHours().toString().padStart(2, '0') + ":" + current.getMinutes().toString().padStart(2, '0');
  let dateTime = cDate + ' ' + cTime;
  return dateTime
  }

const breakLineForLogs = (() => {
  let breakLine = "";
  for (let i = 0; i < 75; i++) {
    breakLine = breakLine + '-'
  }
  return breakLine
})()

/**
 * Returns the raw web page.
 * @param {String} url 
 * @returns {Promise<String>}
 */
function scrapeWebPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.setEncoding('utf-8')
      let rawData = ""

      res.on('data', (chunk) => rawData += chunk)

      res.on('end', () => resolve(rawData))
    }).on('error', (e) => reject(e))
  })
}

/**
 * Reads the content of a file at the specified location.
 * @param {String} filePath 
 * @param {String} encoding optional - defualt is 'utf8'
 * @returns {Promise<String>} the last updated IP Address
 */
function readFrom(filePath, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

/**
 * Appends the log data to file located at the specified path.
 * @param {String} filePath 
 * @param {String} data 
 * @returns {Promise<null>}
 */
async function logTo(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) reject(err)
      else resolve(null)
    });
  });
}

/**
 * Reads and returns the config json.
 * @todo add schema for config
 * @param {String} configFilePath
 * @returns {Promise<Object>}
 */
function readConfig(configFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(JSON.parse(data))
    })
  })
}

module.exports = {
    getFormatedDate,
    breakLineForLogs,
    scrapeWebPage,
    readFrom,
    logTo,
    readConfig
}