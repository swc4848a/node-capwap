var serializer = require("packet").createSerializer();
var enumType = require('./enum');

exports.buildTlv = function(serializer, type, length) {
	var buf = new Buffer(length);
	serializer.write(buf, 0, buf.length);

	var tlv = {
		type: type,
		length: length,
		value: buf.toJSON().data
	};
	return tlv;
}

exports.buildLocationData = function() {
	serializer.serialize('b8[3]z|str("ascii") => locationData', {
		locationData: 'N/A'
	});
	return this.buildTlv(serializer, enumType.tlvType.LOCATION_DATA, 3);
};

exports.buildDiscoveryType = function() {
	serializer.serialize('b8 => discoveryType', {
		discoveryType: enumType.discoveryType.STATIC_CONFIGURATION
	});
	return this.buildTlv(serializer, enumType.tlvType.DISCOVERY_TYPE, 1);
};

exports.buildWtpBoardData = function() {
	var wtpSN = 'FP320C3X14012026';
	serializer.serialize('b32 => vendor, \
		  				  b16 => wtpBoardDataSNType, b16 => wtpBoardDataSNLen, b8[' + wtpSN.length + ']z|str("ascii") => wtpBoardDataSNValue', {
		vendor: 12356,
		wtpBoardDataSNType: 1,
		wtpBoardDataSNLen: wtpSN.length,
		wtpBoardDataSNValue: wtpSN
	});
	var len = 4 + 4 + wtpSN.length;
	return this.buildTlv(serializer, 38, len);
};

exports.buildAcDescriptor = function() {
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
	return this.buildTlv(serializer, 1, len);
};

exports.buildAcName = function() {
	var name = 'FortiCloud Wireless Controller';

	serializer.serialize('b8[' + name.length + ']z|str("ascii") => acName', {
		acName: name
	});

	var len = name.length;
	return this.buildTlv(serializer, 4, len);
};

exports.buildVspWtpAllow = function(sn) {
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
	return this.buildTlv(serializer, 37, len);
};

exports.buildResultCode = function(result) {
	serializer.serialize('b32 => resultCode', {
		resultCode: result
	});
	return this.buildTlv(serializer, enumType.tlvType.RESULT_CODE, 4);
};