'use strict';

var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var data = require('./data');
var decoder = require('../capwap/decoder');
var state = require('./state');
var context = require('./context');
var enumType = require('../capwap/enum');
var debug = require('debug')('node-capwap::client::client');

client.on('listening', function() {
	var address = client.address();
	debug('UDP client listening on ' + address.address + ":" + address.port);
	state.INIT_COMPLETE(client, context);
});

client.on('message', function(message, remote) {
	decoder.parse(message, function(message) {
		var type = message.controlHeader.messageType;
		if (2 === type) {
			debug('Receive Discover Response');
			state.DISCOVERY_RESP_RECV(client, context);
		} else if (enumType.messageType.JOIN_RESPONSE === type) {
			debug('Receive Join Response');
			state.JOIN_RESP_RC_SUCC_IMAGE_SAME(client, context);
		} else if (enumType.messageType.CONFIGURATION_STATUS_RESPONSE === type) {
			debug('Receive Configuration Status Response');
			state.CONFIG_STATUS_RESP_SUCC(client, context);
		} else if (enumType.messageType.CHANGE_STATE_RESPONSE === type) {
			debug('Receive Change State Response');
			state.CHANGE_STATE_EVENT_RC_SUCC(data, context);
		} else if (enumType.messageType.CONFIGURATION_UPDATE_REQUEST) {
			debug('Receive Configuration Update Request');
			state.CFG_UPDATE_REQ_RECV(client, message);
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
	debug("client close");
});

module.exports = client;