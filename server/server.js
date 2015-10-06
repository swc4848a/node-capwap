var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var decoder = require('../capwap/decoder');
var session = require('./session');
var enumType = require('../capwap/enum');

server.on('listening', function() {
	var address = server.address();
	console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function(message, remote) {
	decoder.parse(message, function(request) {
		var type = request.controlHeader.messageType;
		if (1 == type) {
			console.log('receive Discover Request');
			var response = session.discoveryRequestProcess(request);
			server.send(response, 0, response.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP /* error callback */ );
			console.log('send Discover Response');
		} else {
			console.log('unknow message [%d]', type);
		}
	});
});

server.on("error", function(err) {
	console.log("Server Error:\n" + err.stack);
	server.close();
});

server.on("close", function(err) {
	console.log("Server close:\n");
});

module.exports = server;