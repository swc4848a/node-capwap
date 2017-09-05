#node-capwap

### CAPWAP implementation in JavaScript

Control And Provisioning of Wireless Access Points (CAPWAP) Protocol implementation for Node.js
written in JavaScript.

### Objectives

### Running

Install Dependent using NPM.

```
npm install
```

Modify config.json.

```
{
    "server_ip": "172.16.94.161",
    "client_ip": "172.16.94.163"
}
```

Start

```
Server: node server.js  
Client: node client.js  
```
### Diagram

[Mermaid Diagram](./doc/diagram.md)  

### Todo List

 * check if ip/port used by other wtp-session
 * find wtp hash by sn
 * udpate wtp hash ip and port
 * add ip port hash entry
 * check account sta 
 * if wtp session already start, shutdown it
 * after configuration update cloud need start json file push and 802.11 wlan configuration;

### Change Log

Changes for each release.

#### Version 0.0.1

Thu Oct 1 09:00:00 UTC 2015

 * CAPWAP control channel protocol realization, support basic message type for ap connect
 * Use [fschaefer/Stately.js](https://github.com/fschaefer/Stately.js) as DSL state machine
 * Replace console.log with [visionmedia/debug](https://github.com/visionmedia/debug)

#### Version 0.0.2

Thu Nov 4 09:00:00 UTC 2015

 * Add wtp-hash, account-context, wtp-session to manage protocol interaction  
 * Add config file  

#### Version 0.0.3 (node.js:v7.10.0)

Thu Aug 29 09:00:00 UTC 2016

 * Support multiple client connections

Thu Jan 27 09:00:00 UTC 2017
 * Move from flux.js to MobX.js
 * Move from express.js to koa.js

#### Version 0.0.4 (node.js:)

Fri Aug 11 14:51:00 UTC 2017
 * Auto platform upgrade  
 * Cloud AP Portal  

# License

Copyright (c) 2015 Zhaoqing Qiang. Under The MIT License (MIT)