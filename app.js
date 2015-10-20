#!/usr/bin/env node

'use strict';

process.env['DEBUG'] = '*';

var enumType = require('./capwap/enum');

var server = require('./server/server');
server.bind(enumType.socket.SERVER_CTRL_PORT);

var serverData = require('./server/data');
serverData.bind(enumType.socket.SERVER_DATA_PORT);

var client = require('./client/client');
client.bind(enumType.socket.CLIENT_PORT);

var clientData = require('./client/data');
clientData.bind(enumType.socket.CLIENT_DATA_PORT);