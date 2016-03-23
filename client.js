#!/usr/bin/env node

'use strict';

process.env['DEBUG'] = '*';

var enumType = require('./capwap/enum');

var client = require('./client/client');
client.bind(enumType.socket.CLIENT_PORT, process.argv[2]);

var clientData = require('./client/data');
clientData.bind(enumType.socket.CLIENT_DATA_PORT, process.argv[2]);