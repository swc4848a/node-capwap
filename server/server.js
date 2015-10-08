var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var decoder = require('../capwap/decoder');
var session = require('./session');
var enumType = require('../capwap/enum');
var state = require('./state');

server.on('listening', function() {
	var address = server.address();
	console.log('UDP Server listening on ' + address.address + ":" + address.port);
	state.INIT_COMPLETE();
});

server.on('message', function(message, remote) {
	decoder.parse(message, function(request) {
		var type = request.controlHeader.messageType;
		if (enumType.messageType.DISCOVERY_REQUEST == type) {
			console.log('Server: Receive Discover Request');
			var response = session.discoveryRequestProcess(request);
			server.send(response, 0, response.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP /* error callback */ );
			console.log('Server: Send Discover Response');
			state.LOCAL_WTP_CONN();
		} else if (enumType.messageType.JOIN_REQUEST === type) {
			console.log('Server: Receive Join Request');
			state.JOIN_REQ_RECV(server, request);
		} else if (enumType.messageType.CONFIGURATION_STATUS_REQUEST === type) {
			console.log('Server: Receive Configuration Status Request');
			state.CFG_STATUS_REQ(server, request);
		} else if (enumType.messageType.CHANGE_STATE_REQUEST === type) {
			console.log('Server: Receive Change State Request');
			state.CHG_STATE_EVENT_REQ_RECV(server, request);
		} else {
			console.trace('unknow message [%d]', type);
		}
	});
});

server.on("error", function(err) {
	console.trace("Server Error:\n" + err.stack);
	server.close();
});

server.on("close", function(err) {
	console.log("Server close:\n");
});

module.exports = server;