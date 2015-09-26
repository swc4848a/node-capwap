var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var encoder = require('../capwap/encoder');

var buildDiscoverType = function() {
	serializer.serialize('b8 => discoverType', {
		discoverType: 1
	});

	return builder.buildTlv(serializer, 20, 1);
}

exports.create = function(client) {
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
}