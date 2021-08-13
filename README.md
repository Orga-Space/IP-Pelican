# IP-Pelican
Updates your DDNS record automatically.

Currently it is like a Cron Job and can't narrow down the time your ISP changes your IP address.

Default interval is 2h.

This project was created wit ddnss.de as the ddns service provider in mind.

## Config

In `config.js` you have to define
* a page that tells you your public IP address and you are allowed to scrape
* and the update link for your ddns update.


## API

| Path                    | Description                         |
|-------------------------|-------------------------------------|
| `/api/currentIP`        | get current IP                      |
| `/api/updatelog`        | past IP addresses & date            |
| `/api/ddnssResponseLog` | response from ddns Service Provider |
