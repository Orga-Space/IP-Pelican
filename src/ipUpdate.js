const fs = require('fs');
const { getFormatedDate, scrapeWebPage, readFrom, logTo, breakLineForLogs } = require('../helper');



async function main(serviceConfig, paths) {
    try {
        const scrapedIpAddress = await getIpAddress(serviceConfig.pageToScrape);
        const lastLogedIpAddress = await readFrom(paths.currentIpFile);

        if (scrapedIpAddress != lastLogedIpAddress) {
            await updateDDNSService(serviceConfig.ddnsServiceUpdateUrl, paths.ddnssResponseLogFile);
            updateIpLogs(scrapedIpAddress, paths.currentIpFile, paths.ipUpdateLog);
        }
    } catch (e) {
        throw new Error("Did not implement error handling. Error thrown was: " + e);
    }
}

/**
 * Calls the DDNS Service.
 * @param {String} ddnsServiceUpdateUrl 
 * @param {String} ddnssLogPath 
 * @throws if the ddns service can't be called
 * @returns {Promise<void>}
 */
async function updateDDNSService(ddnsServiceUpdateUrl, ddnssLogPath) {
    // calling the url (with the right parameter key) updates the dns entry.
    const response = await scrapeWebPage(ddnsServiceUpdateUrl).catch((ignore) => {throw new Error("DDNSS update failed")});
    logTo(ddnssLogPath, `=> ${getFormatedDate()}:\n${response}\n${breakLineForLogs}\n\n`).catch((error) => {
        console.error(`${getFormatedDate()}: ${error}`);
    })
}

/**
 * Scrapes the given web Page and returns the IP Address.
 * @throws if the page returns an invalid amount of unique IP Addresses
 * @param {String} pageToScrape 
 * @returns {String} an IP Address
 */
async function getIpAddress(pageToScrape) {
    const webPageContent = await scrapeWebPage(pageToScrape);
    const ipArray = getIpsFromText(webPageContent);

    if (ipArray.length === 0)   throw new Error("No IP Address found");
    if (ipArray.length > 1)     throw new Error("More than one IP Addres was found; IP Address Array: " + ipArray);
    if (ipArray.length != 1)    throw new Error("I messed up the if conditions in getIpAddress (~_~)");
    return ipArray[0]
}

/**
 * Returns an array of unique string matching an IP Address
 * @param {String} text 
 * @returns {Array<String>}
 */
function getIpsFromText(text) {
    const regex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/gm;

    const potentialDuplicatedIpAddresses = text.match(regex)
    const uniqueIpAddresses = Array.from(new Set(potentialDuplicatedIpAddresses))
    
    return uniqueIpAddresses
}

/**
 * Updates the current IP Address file and appends to the IP update log.
 * @param {String} ipAddress 
 * @param {String} currentIpFilePath 
 * @param {String} ipUpdateLogPath 
 * @returns {Promise<void>}
 */
async function updateIpLogs(ipAddress, currentIpFilePath, ipUpdateLogPath) {
    await logTo(ipUpdateLogPath, `${getFormatedDate()}, ${ipAddress}\n`)
    return new Promise((resolve, reject) => {
        fs.writeFile(currentIpFilePath, ipAddress, (err) => {
          if (err) reject(err)
          else resolve()
        })
      })
}

module.exports = main;