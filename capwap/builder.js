'use strict';

var serializer = require("packet").createSerializer();
var enumType = require('./enum');

var builder = module.exports = {};

builder.getPreamble = function() {
	return {
		version: 0,
		type: 0
	};
};

var getHeaderFlags = function(flags) {
	return flags ? 0x000008 : 0;
};

builder.getHeader = function(flags) {
	return {
		headerLength: 2,
		radioId: 1,
		wirelessBindId: 1,
		headerFlags: getHeaderFlags(flags),
		fragmentId: 0,
		fragmentOffset: 0,
		reserved: 0
	};
};

builder.getKeepAliveHeader = function() {
	return {
		headerLength: 2,
		radioId: 0,
		wirelessBindId: 0,
		headerFlags: 0x000008,
		fragmentId: 0,
		fragmentOffset: 0,
		reserved: 0
	};
};

builder.getKeepAlive = function() {

};

builder.buildTlv = function(serializer, type, length) {
	var buf = new Buffer(length);
	serializer.write(buf, 0, buf.length);

	var tlv = {
		type: type,
		length: length,
		value: buf.toJSON().data
	};
	return tlv;
}

builder.buildLocationData = function() {
	serializer.serialize('b8[3]z|str("ascii") => locationData', {
		locationData: 'N/A'
	});
	return this.buildTlv(serializer, enumType.tlvType.LOCATION_DATA, 3);
};

builder.buildDiscoveryType = function() {
	serializer.serialize('b8 => discoveryType', {
		discoveryType: enumType.discoveryType.STATIC_CONFIGURATION
	});
	return this.buildTlv(serializer, enumType.tlvType.DISCOVERY_TYPE, 1);
};

builder.buildWtpBoardData = function() {
	var wtpSN = 'FP320C3X14012026';
	var wtpBoardId = '220-1';
	var boardRevision = '0';

	serializer.serialize('b32 => vendor, \
		  				  b16 => wtpBoardDataSNType, b16 => wtpBoardDataSNLen, b8[' + wtpSN.length + ']z|str("ascii") => wtpBoardDataSNValue, \
		  				  b16 => wtpBoardDataBoardIdType, b16 => wtpBoardDataBoardIdLen, b8[' + wtpBoardId.length + ']z|str("ascii") => wtpBoardDataBoardIdValue, \
		  				  b16 => wtpBoardDataRevisionType, b16 => wtpBoardDataRevisionLen, b8 => wtpBoardDataRevisionValue, \
		  				  b16 => wtpBaordDataBaseMacAddressType, b16 => wtpBaordDataBaseMacAddressLen, b8[6] => wtpBaordDataBaseMacAddressValue', {
		vendor: 12356,
		wtpBoardDataSNType: 1,
		wtpBoardDataSNLen: wtpSN.length,
		wtpBoardDataSNValue: wtpSN,
		wtpBoardDataBoardIdType: 2,
		wtpBoardDataBoardIdLen: 5,
		wtpBoardDataBoardIdValue: wtpBoardId,
		wtpBoardDataRevisionType: 3,
		wtpBoardDataRevisionLen: 1,
		wtpBoardDataRevisionValue: boardRevision,
		wtpBaordDataBaseMacAddressType: 4,
		wtpBaordDataBaseMacAddressLen: 6,
		wtpBaordDataBaseMacAddressValue: [0x08, 0x5b, 0x0e, 0xc6, 0x6a, 0x58]
	});
	var len = 4 + 4 + wtpSN.length + 4 + wtpBoardId.length + 4 + boardRevision.length + 4 + 6;
	return this.buildTlv(serializer, 38, len);
};

builder.buildWtpDescriptor = function buildWtpDescriptor() {
	
};

builder.buildAcDescriptor = function() {
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

builder.buildAcName = function() {
	var name = 'FortiCloud Wireless Controller';

	serializer.serialize('b8[' + name.length + ']z|str("ascii") => acName', {
		acName: name
	});

	var len = name.length;
	return this.buildTlv(serializer, 4, len);
};

builder.buildVspWtpAllow = function(sn) {
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

builder.buildResultCode = function(result) {
	serializer.serialize('b32 => resultCode', {
		resultCode: result
	});
	return this.buildTlv(serializer, enumType.tlvType.RESULT_CODE, 4);
};

builder.buildCapwapTimers = function() {
	serializer.serialize('b8 => discovery, b8 => echoRequest', {
		discovery: 3,
		echoRequest: 30,
	});
	return this.buildTlv(serializer, enumType.tlvType.CAPWAP_TIMERS, 4);
};

builder.buildSessionId = function() {
	serializer.serialize('b8[16] => sessionId', {
		sessionId: [0x66, 0x59, 0x9b, 0x55, 0x20, 0x5d, 0x4b, 0x50, 0x57, 0x4c, 0xca, 0xb5, 0x1c, 0x7f, 0xab, 0x19]
	});
	return this.buildTlv(serializer, enumType.tlvType.SESSION_ID, 16);
};

builder.buildWtpName = function() {
	var name = 'FP320C3X14012026';
	serializer.serialize('b8[' + name.length + ']z|str("ascii") => wtpName', {
		wtpName: name
	});
	return this.buildTlv(serializer, enumType.tlvType.WTP_NAME, name.length);
};

builder.buildIeee80211AddWlan = function() {
	var ssid = 'zqq-ssid-7';
	serializer.serialize('b8 => radioId, b8 => wlanId, b16 => capability, \
						  b8 => keyIndex, b8 => keyStatus, b16 => keyLength, \
						  b48 => groupTsc, b8 => qos, b8 => authType, b8 => macMode, \
						  b8 => tunnelMode, b8 => supressSSID, b8[10]z|str("ascii") => ssid', {
		radioId: 1,
		wlanId: 3,
		capability: 0x84e0,
		keyIndex: 0,
		keyStatus: 0,
		keyLength: 0,
		groupTsc: 0,
		qos: 0,
		authType: 0,
		macMode: 0,
		tunnelMode: 1,
		supressSSID: 0,
		ssid: ssid
	});

	var len = 19 + ssid.length;
	return this.buildTlv(serializer, enumType.tlvType.IEEE_80211_ADD_WLAN, len);
};

builder.buildIEEE80211WTPRadioConfiguration = function() {
	serializer.serialize('b8 => radioId, b8 => shortPreamble, b8 => numOfBssids, \
						  b8 => dtimPeriod, b8[6] => bssid, b16 => beaconPeriod, b8[4]z|str("ascii") => countryString', {
		radioId: 1,
		shortPreamble: 1,
		numOfBssids: 8,
		dtimPeriod: 1,
		bssid: [0x08, 0x5b, 0x0e, 0xc6, 0x6a, 0x5a],
		beaconPeriod: 100,
		countryString: 'US'
	});

	var len = 16;
	return this.buildTlv(serializer, enumType.tlvType.IEEE_80211_WTP_RADIO_CONFIGURATION, len);
};

builder.buildVspWtpCapabilities = function buildVspWtpCapabilities() {
	serializer.serialize('b32 => identifier,\
		                  b16 => elementId,\
		                  b16 => version,\
		                  b8 => radioId,\
		                  b8 => wtpCapFlags,\
		                  b8[15] => reserved', {
		identifier: 12356,
		elementId: 192,
		version: 1,
		radioId: 1,
		wtpCapFlags: 0xff,
		reserved: [0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
	});

	var len = 10 + 15;
	return this.buildTlv(serializer, 37, len);
};

builder.buildIEEE80211WTPRadioInformation = function buildIEEE80211WTPRadioInformation(id, type) {
	serializer.serialize('b8 => radioId,\
						  b24 => radioTypeReserved,\
						  b8 => radioType', {
		radioId: id,
		radioTypeReserved: 0,
		radioType: type
	});
	return this.buildTlv(serializer, 1048, 5);
};

builder.builderWtpFrameTunnelMode = function builderWtpFrameTunnelMode() {
	serializer.serialize('b8 => wtpFrameTunnelMode', {
		wtpFrameTunnelMode: 0x04
	});
	return this.buildTlv(serializer, 41, 1);
};

builder.builderWtpMacType = function builderWtpMacType() {
	serializer.serialize('b8 => wtpMacType', {
		wtpMacType: 0
	});
	return this.buildTlv(serializer, 44, 1);
};