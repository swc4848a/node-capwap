'use strict';

var dgram = require('dgram');
var data = dgram.createSocket('udp4');
var decoder = require('../capwap/decoder');
var tool = require('../capwap/tool');

data.on('listening', function() {
	var address = data.address();
	console.log('UDP Server Data listening on ' + address.address + ":" + address.port);
});

data.on('message', function(message, remote) {
	decoder.parse(message, function(request) {
		tool.inspectObject(request);
	});
});

data.on("error", function(err) {
	console.trace("Server Data Error:\n" + err.stack);
	data.close();
});

data.on("close", function(err) {
	console.log("Server Data close:\n");
});

module.exports = data;