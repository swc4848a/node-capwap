#!/usr/bin/env node

'use strict';

process.env['DEBUG'] = '*';

var enumType = require('./capwap/enum');

enumType.socket.SERVER_IP = process.argv[2];
enumType.socket.CLIENT_IP = process.argv[3];

var server = require('./server/server');
server.bind(enumType.socket.SERVER_CTRL_PORT, enumType.socket.SERVER_IP);

var serverData = require('./server/data');
serverData.bind(enumType.socket.SERVER_DATA_PORT, enumType.socket.SERVER_IP);