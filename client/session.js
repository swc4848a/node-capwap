var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var encoder = require('../capwap/encoder');

var buildDiscoverType = function() {
	serializer.serialize('b8 => discoverType', {
		discoverType: 1
	});

	return builder.buildTlv(serializer, 20, 1);
}

var buildWtpBoardData = function() {
	var wtpSN = 'FP320C3X14012026';
	serializer.serialize('b32 => vendor, \
		  				  b16 => wtpBoardDataSNType, b16 => wtpBoardDataSNLen, b8[' + wtpSN.length + ']z|str("ascii") => wtpBoardDataSNValue', {
		vendor: 12356,
		wtpBoardDataSNType: 1,
		wtpBoardDataSNLen: wtpSN.length,
		wtpBoardDataSNValue: wtpSN
	});
	var len = 4 + 4 + wtpSN.length;
	return builder.buildTlv(serializer, 38, len);
}

exports.create = function(client) {
	var discoverType = buildDiscoverType();
	var wtpBoardData = buildWtpBoardData();

	var elementLength = 4 * 2 + discoverType.length + wtpBoardData.length;

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
			discoverType,
			wtpBoardData
		],
	});
	client.send(discoverRequest, 0, discoverRequest.length, 5246, 'localhost' /* error callback */ );
	console.log('send Discover Request');
}