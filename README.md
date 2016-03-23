#node-capwap

### CAPWAP implementation in JavaScript (Work in progress)

Control And Provisioning of Wireless Access Points (CAPWAP) Protocol implementation for Node.js
written in JavaScript.

### Objectives

### Running

Install Dependent using NPM.

```
npm install
```

Start

```
* Server: node server.js SERVER_IP  
* Client: node client.js CLIENT_IP  

```

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
 * use [fschaefer/Stately.js](https://github.com/fschaefer/Stately.js) as DSL state machine
 * replace console.log with [visionmedia/debug](https://github.com/visionmedia/debug)

#### Version 0.0.2

Thu Nov 4 09:00:00 UTC 2015

 * Add wtp-hash, account-context, wtp-session to manage protocol interaction  
 * 


# License

Copyright (c) 2015 Zhaoqing Qiang. Under The MIT License (MIT)
