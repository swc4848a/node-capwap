'use strict';

var dgram = require('dgram');
var data = dgram.createSocket('udp4');
var decoder = require('../capwap/decoder');
var tool = require('../capwap/tool');
var state = require('./state');
var debug = require('debug')('node-capwap::server::data');

data.on('listening', function() {
	var address = data.address();
	debug('UDP Server Data listening on ' + address.address + ":" + address.port);
});

data.on('message', function(message, remote) {
	decoder.parse(message, function(request) {
		tool.inspectObject(request);
		var headerFlags = request.header.headerFlags;
		if (headerFlags && 0x08) {
			debug('Receive Keep Alive');
			if ('DATA_CHAN_SETUP' === state.getMachineState()) {
				state.DATA_CHAN_CONNECTED(data, request);
			}
			state.DATA_CHAN_KEEP_ALIVE_RECV(data, request);
			// session.keepAliveResonse(data, request);
		}
	});
});

data.on("error", function(err) {
	console.trace("Server Data Error:\n" + err.stack);
	data.close();
});

data.on("close", function(err) {
	debug("Server Data close");
});

module.exports = data;