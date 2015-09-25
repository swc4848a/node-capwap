var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var encoder = require('../capwap/encoder');
var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');

var buildDiscoverType = function() {
	serializer.serialize('b8 => discoverType', {
		discoverType: 1
	});

	return builder.buildTlv(serializer, 20, 1);
}

client.on('listening', function() {
	var address = client.address();
	console.log('UDP client listening on ' + address.address + ":" + address.port);

	var discoverType = buildDiscoverType();
	var elementLength = 4 * 1 + discoverType.length;
	var discoverRequest = encoder.encode({
		preamble: {
			version: 0,
			type: 0
		},
		header: {
			headerLength: 2,
			radioId: 1,
			wirelessBindId: 1,
			headerFlags: 0,
			fragmentId: 0,
			fragmentOffset: 0,
			reserved: 0
		},
		controlHeader: {
			messageType: 1,
			sequneceNumber: 0x9e,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: [
			discoverType
		],
	});
	client.send(discoverRequest, 0, discoverRequest.length, 5246, 'localhost' /* error callback */ );
	console.log('send Discover Request');
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