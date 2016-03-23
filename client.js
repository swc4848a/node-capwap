#!/usr/bin/env node

'use strict';

process.env['DEBUG'] = '*';

var enumType = require('./capwap/enum');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

enumType.socket.SERVER_IP = config.server_ip;
enumType.socket.CLIENT_IP = config.client_ip;

var client = require('./client/client');
client.bind(enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);

var clientData = require('./client/data');
clientData.bind(enumType.socket.CLIENT_DATA_PORT, enumType.socket.CLIENT_IP);