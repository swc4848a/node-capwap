#!/usr/bin/env node

'use strict';

process.env['DEBUG'] = '*';

var enumType = require('./capwap/enum');

var server = require('./server/server');
server.bind(enumType.socket.SERVER_CTRL_PORT, process.argv[2]);

var serverData = require('./server/data');
serverData.bind(enumType.socket.SERVER_DATA_PORT, process.argv[2]);