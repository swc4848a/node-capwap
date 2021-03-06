'use strict';

var _ = require('underscore');
var parser = require('packet').createParser();
var enumType = require('./enum');
var tool = require('./tool');

var object = {};
var callback;

var decoder = module.exports = {};

var bin2String = function(array) {
	return String.fromCharCode.apply(String, array);
}

var parseMessageElement = function(message, elementLength) {
	parser.extract('x128, b8[' + elementLength + '] => messageElement', function(element) {
		object.messageElement = {};
		parseTlv(element.messageElement, elementLength);
	});
	parser.parse(message);
}

var parseKeepAliveMessageElement = function(message, elementLength) {
	parser.extract('x80, b8[' + elementLength + '] => messageElement', function(element) {
		parseTlv(element.messageElement, elementLength);
	});
	parser.parse(message);
};

var parseTlv = function(tlv, elementLength) {
	parser.extract('x16, b16 => length', function(tlvObj) {
		parseTlvValue(tlv, tlvObj.length);
		var len = tlvObj.length + 4;
		if (elementLength > len) {
			parseTlv(tlv.slice(len, elementLength), elementLength - len);
		}
		if (elementLength === len) callback(object);
	});
	parser.parse(tlv);
}

var getVenderIdentifier = function(value) {
	var identifier = (value[0] << 24 | value[1] << 16 | value[2] << 8 | value[3]);
	if (identifier === 0x3044) return 'Fortinet, Inc. (' + identifier + ')';
	return 'error';
}

var getVenderElementId = function(value) {
	return (value[4] << 8 | value[5]);
}

var getVenderData = function(value) {
	var elementId = (value[4] << 8 | value[5]);
	var data = {};
	if (elementId === 0xa1) {
		data.mgmtVlanTag = (value[6] << 8 | value[7]);
	} else if (elementId === 0xc0) {
		data.version = (value[6] << 8 | value[7]);
		data.radioId = value[8];
		data.wtpCapFlags = value[9];
		data.reserved = value.slice(9, value.length);
	}
	return data;
}

var getWtpBoardData = function(tlv, start) {
	var data = {};
	data.type = (tlv[start] << 8 | tlv[start + 1]);
	data.length = (tlv[start + 2] << 8 | tlv[start + 3]);
	var valueArray = tlv.slice(start + 4, start + 4 + data.length);
	if (data.type === 4) { //Base mac address
		data.value = valueArray;
	} else {
		data.value = bin2String(valueArray);
	}
	return data;
}

var getAcDescriptor = function(tlv, success) {
	parser.extract('b16 => stations, b16 => limitStations, b16 => activeWtps, b16 => maxWtps, b8 => securityFlags, \
		            b8 => rmacField, x8, b8 => dtlsPolicyFlags, \
		            b32 => acInformationHardwareVendor, b16 => acInformationHardwareType, b16 => acInformationHardwareLength, \
		            b40 => acInformationHardwareValue, b8[5]z|str("ascii") => acHardwareVersion, \
		            b32 => acInformationSoftwareVendor, b16 => acInformationSoftwareType, b16 => acInformationSoftwareLength, \
		            b40 => acInformationSoftwareValue, b8[5]z|str("ascii") => acSoftwareVersion', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv);
}

var getAcName = function(tlv, success) {
	parser.extract('b8[' + tlv.length + ']z|str("ascii") => acName', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
}

var getLocationData = function(tlv, success) {
	parser.extract('b8[3]z|str("ascii") => locationData', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getResultCode = function(tlv, success) {
	parser.extract('b32 => resultCode', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getCapwapTimers = function(tlv, success) {
	parser.extract('b8 => discovery, b8 => echoRequest', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getSessionId = function(tlv, success) {
	parser.extract('b8[16] => sessionId', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getWtpName = function(tlv, success) {
	parser.extract('b8[' + tlv.length + ']z|str("ascii") => wtpName', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getIeee80211AddWlan = function(tlv, success) {
	parser.extract('b8 => radioId, b8 => wlanId, b16 => capability, \
					b8 => keyIndex, b8 => keyStatus, b16 => keyLength, \
					b48 => groupTsc, b8 => qos, b8 => authType, b8 => macMode, \
					b8 => tunnelMode, b8 => supressSSID, b8[10]z|str("ascii") => ssid', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getIeee80211AssignedWtpBssid = function getIeee80211AssignedWtpBssid(tlv, success) {
	parser.extract('b8 => radioId, b8 => wlanId, b8[6] => bssid', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getIeee80211WtpRadioConfiguration = function(tlv, success) {
	parser.extract('b8 => radioId, b8 => shortPreamble, b8 => numOfBssids, \
					b8 => dtimPeriod, b8[6] => bssid, b16 => beaconPeriod, b8[4]z|str("ascii") => countryString', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getIeee80211WtpRadioInformation = function getIeee80211WtpRadioInformation(tlv, success) {
	parser.extract('b8 => radioId,\
					b24 => radioTypeReserved,\
					b8 => radioType', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getWtpFrameTunnelMode = function getWtpFrameTunnelMode(tlv, success) {
	parser.extract('b8 => wtpFrameTunnelMode', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getWtpMacType = function getWtpMacType(tlv, success) {
	parser.extract('b8 => wtpMacType', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var getWtpDescriptor = function getWtpDescriptor(tlv, success) {
	// todo: auto calculate len?
	parser.extract('b32 => wtpDescriptorHardwareVersionVendor, \
		            b16 => wtpDescriptorHardwareVersionType, \
		            b16 => wtpDescriptorHardwareVersionLen, \
		            b8[1]z|str("ascii") => wtpDescriptorHardwareVersionValue, \
		            b32 => wtpDescriptorActiveSoftwareVersionVendor, \
				    b16 => wtpDescriptorActiveSoftwareVersionType, \
				    b16 => wtpDescriptorActiveSoftwareVersionLen, \
				    b8[20]z|str("ascii") => wtpDescriptorActiveSoftwareVersionValue, \
				    b32 => wtpDescriptorBootVersionVendor, \
				    b16 => wtpDescriptorBootVersionType, \
				    b16 => wtpDescriptorBootVersionLen, \
				    b8[8]z|str("ascii") => wtpDescriptorBootVersionValue, \
				    b32 => wtpDescriptorOtherSoftwareVersionVendor, \
				    b16 => wtpDescriptorOtherSoftwareVersionType, \
				    b16 => wtpDescriptorOtherSoftwareVersionLen, \
				    b8[20]z|str("ascii") => wtpDescriptorOtherSoftwareVersionValue', function(tlvObj) {
		success(tlvObj);
	});
	parser.parse(tlv.value);
};

var parseTlvValueObject = function(tlv, success) {
	var obj = {};
	obj.type = tlv.type;
	obj.length = tlv.length;
	if (tlv.type === 1) {
		// 'AC Descriptor （1）'
		getAcDescriptor(tlv.value, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === 4) {
		// 'AC Name (4)'
		getAcName(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.CAPWAP_TIMERS) {
		// CAPWAP Timers Discovery (Sec): 3
		getCapwapTimers(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === 20) {
		// 'Discover Type (20)';
		if (tlv.value[0] === 1) {
			obj.value = 'Discover Type: Static Configuration (1)';
		}
		success(obj);
	} else if (tlv.type === enumType.tlvType.LOCATION_DATA) {
		// 'Location Data (28)';
		getLocationData(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.RESULT_CODE) {
		// 'Result Code (33)';
		getResultCode(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.SESSION_ID) {
		// Type: (t=35,l=16) Session ID
		getSessionId(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === 37) {
		// 'Vendor Specific Payload (37)';
		obj.value = {};
		obj.value.venderIdentifier = getVenderIdentifier(tlv.value);
		obj.value.venderElementId = getVenderElementId(tlv.value);
		obj.value.venderData = getVenderData(tlv.value);
		success(obj);
	} else if (tlv.type === 38) {
		// 	'WTP Board Data (38)';
		obj.wtpBoardDataVendor = getVenderIdentifier(tlv.value);
		var data;
		for (var i = 4; i < tlv.length; i += (data.length + 4)) {
			data = getWtpBoardData(tlv.value, i);
			if (data.type === 0) {
				obj.wtpModelNumber = data;
			} else if (data.type === 1) {
				obj.wtpSerialNumber = data;
			} else if (data.type === 2) {
				obj.wtpBoardId = data;
			} else if (data.type === 3) {
				obj.wtpBoardRevision = data;
			} else if (data.type === 4) {
				obj.wtpBaseMacAddress = data;
			}
		}
		success(obj);
	} else if (tlv.type === enumType.tlvType.WTP_NAME) {
		// Type: WTP Name (45)
		getWtpName(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.IEEE_80211_ADD_WLAN) {
		// Type: IEEE 802.11 Add WLAN (1024)
		getIeee80211AddWlan(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.IEEE_80211_ASSIGNED_WTP_BSSID) {
		// Type: IEEE 802.11 Assigned WTP BSSID (1026)
		getIeee80211AssignedWtpBssid(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.IEEE_80211_WTP_RADIO_CONFIGURATION) {
		// Type: IEEE 802.11 WTP Radio Configuration (1046)
		getIeee80211WtpRadioConfiguration(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.IEEE_80211_WTP_RADIO_INFORMATION) {
		// Type: IEEE 802.11 WTP Radio Information (1048)
		getIeee80211WtpRadioInformation(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.WTP_FRAME_TUNNEL_MODE) {
		// Type: WTP Frame Tunnel Mode  (41)
		getWtpFrameTunnelMode(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.WTP_MAC_TYPE) {
		// Type: WTP MAC Type (44)
		getWtpMacType(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else if (tlv.type === enumType.tlvType.WTP_DESCRIPTOR) {
		// Type: WTP Descriptor (39)
		getWtpDescriptor(tlv, function(tlvObj) {
			obj.value = tlvObj;
			success(obj);
		});
	} else {
		console.trace('unknown tlv type [%d]', tlv.type);
	}
}

var parseTlvValue = function(tlv, length) {
	parser.extract('b16 => type, b16 => length, b8[' + length + '] => value', function(tlvInner) {
		parseTlvValueObject(tlvInner, function(tlvObj) {
			if (tlvObj.type === 1) {
				object.messageElement.acDescriptor = tlvObj;
			} else if (tlvObj.type === 4) {
				object.messageElement.acName = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.CAPWAP_TIMERS) {
				object.messageElement.capwapTimers = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.DISCOVERY_TYPE) {
				object.messageElement.discoverType = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.LOCATION_DATA) {
				object.messageElement.locationData = tlvObj;
			} else if (tlvObj.type === 37) {
				if (tlvObj.value.venderElementId === 34) {
					object.messageElement.vspMgmtWtpAllow = tlvObj;
				} else if (tlvObj.value.venderElementId === 161) {
					object.messageElement.vspMgmtVlanTag = tlvObj;
				} else if (tlvObj.value.venderElementId === 192) {
					object.messageElement.vspWtpCapabilities = tlvObj;
				} else {
					console.trace('unknown vsp element id [%d]', tlvObj.value.venderElementId);
				}
			} else if (tlvObj.type === 38) {
				object.messageElement.wtpBoardData = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.RESULT_CODE) {
				object.messageElement.resultCode = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.SESSION_ID) {
				// todo: merge keepAlive and join req
				if (object.keepAlive) {
					object.keepAlive.messageElement.sessionId = tlvObj;
				} else {
					object.messageElement.sessionId = tlvObj;
				}
			} else if (tlvObj.type === enumType.tlvType.WTP_NAME) {
				object.messageElement.wtpName = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.IEEE_80211_ADD_WLAN) {
				object.messageElement.ieee80211AddWlan = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.IEEE_80211_ASSIGNED_WTP_BSSID) {
				object.messageElement.ieee80211AssignedWtpBssid = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.IEEE_80211_WTP_RADIO_CONFIGURATION) {
				object.messageElement.ieee80211WtpRadioConfiguration = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.IEEE_80211_WTP_RADIO_INFORMATION) {
				if (_.isUndefined(object.messageElement.ieee80211WtpRadioInformation)) {
					object.messageElement.ieee80211WtpRadioInformation = [];
				}
				object.messageElement.ieee80211WtpRadioInformation.push(tlvObj.value);
			} else if (tlvObj.type === enumType.tlvType.WTP_FRAME_TUNNEL_MODE) {
				object.messageElement.wtpFrameTunnelMode = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.WTP_MAC_TYPE) {
				object.messageElement.wtpMacType = tlvObj;
			} else if (tlvObj.type === enumType.tlvType.WTP_DESCRIPTOR) {
				object.messageElement.wtpDescriptor = tlvObj;
			} else {
				console.trace('unknown tlv type [%d]', tlvObj.type);
			}
		});
	});
	parser.parse(tlv);
}

var parsePreamble = function(preamble) {
	parser.extract('b8{b4 => version, b4 => type}', function(preamble) {
		object.preamble = preamble;
	});
	parser.parse(preamble);
}

var parseHeader = function(header, callback) {
	parser.extract('b56{b5 => headerLength, b5 => radioId, b5 => wirelessBindId, b9 => headerFlags, b16 => fragmentId, b13 => fragmentOffset, b3 => reserved}', function(header) {
		object.header = header;
		callback(header);
	});
	parser.parse(header);
}

var parseControlHeader = function(message) {
	parser.extract('x64, b32 => messageType, \
					b8 => sequneceNumber, \
					b16 => messageElementLength, \
					b8 => flags', function(controlHeader) {
		object.controlHeader = controlHeader;
		parseMessageElement(message, controlHeader.messageElementLength);
	});
	parser.parse(message);
}

var parseKeepAlive = function(message) {
	parser.extract('x64, b16 => messageElementLength', function(keepAlive) {
		object.keepAlive = keepAlive;
		object.keepAlive.messageElement = {};
		parseKeepAliveMessageElement(message, keepAlive.messageElementLength);
	});
	parser.parse(message);
};

var isControlPacket = function(header) {
	return header.headerFlags === 0;
};

decoder.parse = function(message, success) {
	callback = success;
	object = {};
	parser.extract('b8[1] => preamble, \
		            b8[7] => header', function(capwap) {
		parsePreamble(capwap.preamble);
		parseHeader(capwap.header, function(header) {
			if (isControlPacket(header)) {
				parseControlHeader(message);
			} else {
				parseKeepAlive(message);
			}
		});
	});
	parser.parse(message);
}