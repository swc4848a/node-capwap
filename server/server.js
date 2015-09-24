var dgram = require('dgram');
var capwap = dgram.createSocket('udp4');
var decoder = require('./decoder');
var control = require('./control');

capwap.on('listening', function() {
	var address = capwap.address();
	console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

capwap.on('message', function(message, remote) {
	decoder.parse(message, function(request) {
		var type = request.controlHeader.messageType;
		if (1 == type) {
			console.log('receive Discover Request');
			var response = control.discoverRequestProcess(request);
			capwap.send(response, 0, response.length, 5246, '172.16.94.161' /* error callback */ );
			console.log('send Discover Response');
		} else {
			console.log('unknow message [%d]', type);
		}
	});
});

module.exports = capwap;