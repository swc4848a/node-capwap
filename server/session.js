var encoder = require('../capwap/encoder');
var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var util = require('../capwap/util');

exports.discoveryRequestProcess = function(request) {
	var tlv = [
		builder.buildAcDescriptor(),
		builder.buildAcName(),
		builder.buildVspWtpAllow(request.messageElement.wtpBoardData.wtpSerialNumber.value),
	];
	var elementLength = util.calMessageElementLength(tlv);
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