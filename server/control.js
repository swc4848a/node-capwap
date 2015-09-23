var encoder = require('./encoder');
var serializer = require("packet").createSerializer();

var buildTlv = function(serializer, type, length) {
	var buf = new Buffer(length);
	serializer.write(buf, 0, buf.length);

	var tlv = {
		type: type,
		length: length,
		value: buf.toJSON().data
	};
	return tlv;
}

var buildAcDescriptor = function() {
	var hVersion = '1.0.0';
	var sVersion = '2.0.0';

	serializer.serialize('b16 => stations, b16 => limitStations, b16 => activeWtps, b16 => maxWtps, \
		                  b8 => securityFlags, b8 => rMacField, x8, b8 => dtlsPolicyFlags, \
		                  b32 => hverdor, b16 => htype, b16 => hlength, b8[' + hVersion.length + ']z|str("ascii") => hvalue, \
		                  b32 => sverdor, b16 => stype, b16 => slength, b8[' + sVersion.length + ']z|str("ascii") => svalue', {
		stations: 128,
		limitStations: 255,
		activeWtps: 128,
		maxWtps: 5000,
		securityFlags: 0x02,
		rMacField: 0,
		dtlsPolicyFlags: 0,
		hverdor: 0,
		htype: 4,
		hlength: hVersion.length,
		hvalue: hVersion,
		sverdor: 0,
		stype: 5,
		slength: sVersion.length,
		svalue: sVersion,
	});

	var len = 28 + hVersion.length + sVersion.length;
	return buildTlv(serializer, 1, len);
}

var buildAcName = function() {
	var name = 'FortiCloud Wireless Controller';

	serializer.serialize('b8[' + name.length + ']z|str("ascii") => acName', {
		acName: name
	});

	var len = name.length;
	return buildTlv(serializer, 4, len);
}

var buildVspWtpAllow = function(sn) {
	serializer.serialize('b32 => identifier, \
		                  b16 => elementId, \
		                  b8[' + sn.length + ']z|str("ascii") => wtpSN, \
		                  b8 => allow', {
		identifier: 12356,
		elementId: 0x22,
		wtpSN: sn,
		allow: 0
	});

	var len = 7 + sn.length;
	return buildTlv(serializer, 37, len);
}

exports.discoverRequestProcess = function(request) {
	var acDescriptor = buildAcDescriptor();
	var acName = buildAcName();
	var vspWtpAllow = buildVspWtpAllow(request.messageElement.wtpBoardData.wtpSerialNumber.value);
	var elementLength = 4 * 3 + acDescriptor.length + acName.length + vspWtpAllow.length;

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
		tlv: [
			acDescriptor,
			acName,
			vspWtpAllow
		]
	});

	return res;
}