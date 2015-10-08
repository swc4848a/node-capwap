var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var encoder = require('../capwap/encoder');
var enumType = require('../capwap/enum');
var tool = require('../capwap/tool');

var scheduleWaitDiscoveryResponse = function(context) {
	context.discoveryTimer = setTimeout(function() {
		console.log('wait discovery response timeout: %d times', context.discoveryCount);
		// todo:
		context.discoveryCount++;
		if (context.discoveryCount <= enumType.timer.MAX_RETRY) scheduleWaitDiscoveryResponse(context);
	}, 1000);
};

exports.create = function(client, context) {
	var tlv = [
		builder.buildDiscoveryType(),
		builder.buildWtpBoardData(),
	];
	var elementLength = tool.calMessageElementLength(tlv);
	var discoverRequest = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.DISCOVERY_REQUEST,
			sequneceNumber: context.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	client.send(discoverRequest, 0, discoverRequest.length, enumType.socket.SERVER_PORT, enumType.socket.SERVER_IP /* error callback */ );
	context.discoveryCount++;
	scheduleWaitDiscoveryResponse(context);
	console.log('send Discover Request');
}

exports.startJoin = function(client, context) {
	var tlv = [
		builder.buildLocationData(),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var joinRequest = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.JOIN_REQUEST,
			sequneceNumber: context.sequneceNumber++,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	client.send(joinRequest, 0, joinRequest.length, enumType.socket.SERVER_PORT, enumType.socket.SERVER_IP);
	console.log('send Join Request');
}

exports.startConfig = function(client, context) {
	var tlv = [
		builder.buildAcName(),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var configurationStatusRequest = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.CONFIGURATION_STATUS_REQUEST,
			sequneceNumber: context.sequneceNumber++,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	client.send(configurationStatusRequest, 0, configurationStatusRequest.length, enumType.socket.SERVER_PORT, enumType.socket.SERVER_IP);
	console.log('send Configuration Status Request');
};