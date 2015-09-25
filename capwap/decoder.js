var parser = require('packet').createParser();
var object = {};
var callback;

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

var parseTlvValueObject = function(tlv) {
	var obj = {};
	obj.type = tlv.type;
	obj.length = tlv.length;
	if (tlv.type === 20) {
		// 'Discover Type (20)';
		if (tlv.value[0] === 1) {
			obj.value = 'Discover Type: Static Configuration (1)';
		}
	} else if (tlv.type === 37) {
		// 'Vendor Specific Payload (37)';
		obj.value = {};
		obj.value.venderIdentifier = getVenderIdentifier(tlv.value);
		obj.value.venderElementId = getVenderElementId(tlv.value);
		obj.value.venderData = getVenderData(tlv.value);
	} else if (tlv.type === 38) {
		// 	WTP Board Data (38)
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
	} else {
		console.error('unknown tlv type [%d]', tlv.type);
	}
	return obj;
}

var parseTlvValue = function(tlv, length) {
	parser.extract('b16 => type, b16 => length, b8[' + length + '] => value', function(tlv) {
		var tlvObj = parseTlvValueObject(tlv);
		if (tlvObj.type === 20) {
			object.messageElement.discoverType = tlvObj;
		} else if (tlvObj.type === 37) {
			if (tlvObj.value.venderElementId === 161) {
				object.messageElement.vspMgmtVlanTag = tlvObj;
			} else if (tlvObj.value.venderElementId === 192) {
				object.messageElement.vspWtpCapabilities = tlvObj;
			} else {
				console.error('unknown vsp element id [%d]', tlvObj.value.venderElementId);
			}
		} else if (tlvObj.type === 38) {
			object.messageElement.wtpBoardData = tlvObj;
		} else {
			console.error('unknown tlv type [%d]', tlvObj.type);
		}
	});
	parser.parse(tlv);
}

var parsePreamble = function(preamble) {
	parser.extract('b8{b4 => version, b4 => type}', function(preamble) {
		object.preamble = preamble;
	});
	parser.parse(preamble);
}

var parseHeader = function(header) {
	parser.extract('b56{b5 => headerLength, b5 => radioId, b5 => wirelessBindId, b9 => headerFlags, b16 => fragmentId, b13 => fragmentOffset, b3 => reserved}', function(header) {
		object.header = header;
	});
	parser.parse(header);
}

var parseControlHeader = function(message, controlHeader) {
	parser.extract('b32 => messageType, \
					b8 => sequneceNumber, \
					b16 => messageElementLength, \
					b8 => flags', function(controlHeader) {
		object.controlHeader = controlHeader;
		parseMessageElement(message, controlHeader.messageElementLength);
	});
	parser.parse(controlHeader);
}

exports.parse = function(message, success) {
	callback = success;
	parser.extract('b8[1] => preamble, \
		            b8[7] => header, \
		            b8[8] => controlHeader', function(capwap) {
		parsePreamble(capwap.preamble);
		parseHeader(capwap.header);
		parseControlHeader(message, capwap.controlHeader);
	});
	parser.parse(message);
}