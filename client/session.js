var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var encoder = require('../capwap/encoder');
var enumType = require('../capwap/enum');

var buildDiscoveryType = function() {
	serializer.serialize('b8 => discoveryType', {
		discoveryType: enumType.discoveryType.STATIC_CONFIGURATION
	});
	return builder.buildTlv(serializer, enumType.tlvType.DISCOVERY_TYPE, 1);
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

var scheduleWaitDiscoveryResponse = function(context) {
	context.discoveryTimer = setTimeout(function() {
		console.log('wait discovery response timeout: %d times', context.discoveryCount);
		// todo:
		context.discoveryCount++;
		if (context.discoveryCount <= enumType.timer.MAX_RETRY) scheduleWaitDiscoveryResponse(context);
	}, 1000);
};

exports.create = function(client, context) {
	var discoveryType = buildDiscoveryType();
	var wtpBoardData = buildWtpBoardData();

	var elementLength = 4 * 2 + discoveryType.length + wtpBoardData.length;

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
			discoveryType,
			wtpBoardData
		],
	});
	client.send(discoverRequest, 0, discoverRequest.length, enumType.socket.SERVER_PORT, enumType.socket.SERVER_IP /* error callback */ );
	context.discoveryCount++;
	scheduleWaitDiscoveryResponse(context);
	console.log('send Discover Request');
}