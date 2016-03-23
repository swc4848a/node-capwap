#!/usr/bin/env node

'use strict';

process.env['DEBUG'] = '*';

var enumType = require('./capwap/enum');

enumType.socket.CLIENT_IP = process.argv[2];
enumType.socket.SERVER_IP = process.argv[3];

var client = require('./client/client');
client.bind(enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);

var clientData = require('./client/data');
clientData.bind(enumType.socket.CLIENT_DATA_PORT, enumType.socket.CLIENT_IP);