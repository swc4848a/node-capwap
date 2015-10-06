var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var decoder = require('../capwap/decoder');
var util = require('util');
var state = require('./state');
var context = require('./context');

client.on('listening', function() {
	var address = client.address();
	console.log('UDP client listening on ' + address.address + ":" + address.port);
	state.INIT_COMPLETE(client, context);
});

client.on('message', function(message, remote) {
	decoder.parse(message, function(response) {
		var type = response.controlHeader.messageType;
		if (2 == type) {
			console.log('Receive Discover Response');
			state.DISCOVERY_RESP_RECV(client, context);
		} else {
			console.log('unknow message [%d]', type);
		}
	});
});

client.on("error", function(err) {
	console.log("client Error:\n" + err.stack);
	client.close();
});

client.on("close", function(err) {
	console.log("client close:\n");
});

module.exports = client;