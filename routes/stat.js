'use strict';

var express = require('express');
var router = express.Router();
var dgram = require('dgram');

router.get('/', function(req, res) {
	var message = new Buffer(JSON.stringify({
		method: 'get',
		url: '/debug/tracePacketShmDump/',
		apNetworkOid: 100,
		id: 1
	}));

	var client = dgram.createSocket('udp4');
	client.bind(65535);

	client.send(message, 0, message.length, 9688, '172.16.94.163');

	client.on('message', function(message, remote) {
		res.json(JSON.parse(message.toString()));
		client.close();
	});

	client.on("error", function(err) {
		console.trace("client Error:\n" + err.stack);
		client.close();
	});
});

module.exports = router;