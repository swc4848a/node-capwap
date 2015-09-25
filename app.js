#!/usr/bin/env node

var server = require('./server/server');
server.bind(5246);

var client = require('./client/client');
client.bind(10002);