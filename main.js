const https = require('https')
const fs = require('fs');

const regex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/gm;

(async function main() {
  try {
    const config = await getConfig();
    const webPage = await getWebContend(config.ipScraperPage)
    const ip = getIpFromPage(webPage)
    if (await didIpChanged(ip)) {
      const response = await getWebContend(config.ddnsServiceUpdateUrl)
      await updateIpLogs(ip)
      console.log(response)
    }
  } catch (e) {
    console.error(e)
  }
})()

function getConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/config.json", 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(JSON.parse(data))
    })
  })
}

function getWebContend(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.setEncoding('utf-8')
      let rawData = ""

      res.on('data', (chunk) => rawData += chunk)

      res.on('end', () => resolve(rawData))
    }).on('error', (e) => reject(e))
  })
}

function getIpFromPage(webPage) {
  const potentialDuplicatedIpAddresses = webPage.match(regex)
  const uniqueIpAddresses = Array.from(new Set(potentialDuplicatedIpAddresses))
  
  if (uniqueIpAddresses.length === 0) throw new Error("No IP Address found")
  if (uniqueIpAddresses.length > 1) throw new Error("More than one IP Addres was found; IP Address Array: " + uniqueIpAddresses)
  return uniqueIpAddresses[0]
}

async function didIpChanged(ip) {
  const lastIp = await readIpFromFile()

  return !(lastIp === ip)
}

function readIpFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/iplogs/currentIp', 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function updateIpLogs(ip) {
  return new Promise((resolve, reject) => {
    fs.appendFile(__dirname + '/iplogs/log.csv', `${getFormatedDate()}, ${ip}\n`, (err) => {
      if (err) reject(err)
    })
    fs.writeFile(__dirname + '/iplogs/currentIp', ip, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function getFormatedDate() {
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes();
  let dateTime = cDate + ' ' + cTime;
  return dateTime
}
