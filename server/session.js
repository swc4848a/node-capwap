var encoder = require('../capwap/encoder');
var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var tool = require('../capwap/tool');
var enumType = require('../capwap/enum');

exports.discoveryRequestProcess = function(request) {
	var tlv = [
		builder.buildAcDescriptor(),
		builder.buildAcName(),
		builder.buildVspWtpAllow(request.messageElement.wtpBoardData.wtpSerialNumber.value),
	];
	var elementLength = tool.calMessageElementLength(tlv);
	var res = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: 2,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	return res;
}

exports.joinRequestProcess = function(server, request) {
	var tlv = [
		builder.buildResultCode(0), // Success
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var joinResponse = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.JOIN_RESPONSE,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(joinResponse, 0, joinResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	console.log('send Join Response');
};

exports.configurationStatusRequestProcess = function(server, request) {
	var tlv = [
		builder.buildCapwapTimers(),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var configurationStatusResponse = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.CONFIGURATION_STATUS_RESPONSE,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(configurationStatusResponse, 0, configurationStatusResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	console.log('send Configuration Status Response');
};