var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var session = require('./session');

client.on('listening', function() {
	var address = client.address();
	console.log('UDP client listening on ' + address.address + ":" + address.port);
	session.create(client);
});

client.on('message', function(message, remote) {
	console.log("client receive:\n" + message);
});

client.on("error", function(err) {
	console.log("client Error:\n" + err.stack);
	client.close();
});

client.on("close", function(err) {
	console.log("client close:\n");
});

module.exports = client;