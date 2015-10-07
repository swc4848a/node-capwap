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