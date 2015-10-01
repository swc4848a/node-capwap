#!/usr/bin/env node

var enumType = require('./capwap/enum');

var server = require('./server/server');
server.bind(enumType.socket.SERVER_PORT);

var client = require('./client/client');
client.bind(enumType.socket.CLIENT_PORT);