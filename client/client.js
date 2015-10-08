var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var decoder = require('../capwap/decoder');
var state = require('./state');
var context = require('./context');
var enumType = require('../capwap/enum');

client.on('listening', function() {
	var address = client.address();
	console.log('UDP client listening on ' + address.address + ":" + address.port);
	state.INIT_COMPLETE(client, context);
});

client.on('message', function(message, remote) {
	decoder.parse(message, function(response) {
		var type = response.controlHeader.messageType;
		if (2 === type) {
			console.log('Client: Receive Discover Response');
			state.DISCOVERY_RESP_RECV(client, context);
		} else if (enumType.messageType.JOIN_RESPONSE === type) {
			console.log('Client: Receive Join Response');
			state.JOIN_RESP_RC_SUCC_IMAGE_SAME(client, context);
		} else if (enumType.messageType.CONFIGURATION_STATUS_RESPONSE === type) {
			console.log('Client: Receive Configuration Status Response');
			state.CONFIG_STATUS_RESP_SUCC(client, context);
		} else {
			console.trace('unknow message [%d]', type);
		}
	});
});

client.on("error", function(err) {
	console.trace("client Error:\n" + err.stack);
	client.close();
});

client.on("close", function(err) {
	console.log("client close:\n");
});

module.exports = client;