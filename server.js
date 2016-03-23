#!/usr/bin/env node

'use strict';

process.env['DEBUG'] = '*';

var enumType = require('./capwap/enum');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

enumType.socket.SERVER_IP = config.server_ip;
enumType.socket.CLIENT_IP = config.client_ip;

var server = require('./server/server');
server.bind(enumType.socket.SERVER_CTRL_PORT, enumType.socket.SERVER_IP);

var serverData = require('./server/data');
serverData.bind(enumType.socket.SERVER_DATA_PORT, enumType.socket.SERVER_IP);