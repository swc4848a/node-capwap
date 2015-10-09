var serializer = require("packet").createSerializer();
var buf;

var messageStart = 0;
var encodePreamble = function(preamble) {
	serializer.serialize('b8{b4 => version, b4 => type}', preamble);
	serializer.write(buf, messageStart, 1);
	messageStart += 1;
}

var encodeHeader = function(header) {
	serializer.serialize('b56{b5 => headerLength, b5 => radioId, b5 => wirelessBindId, b9 => headerFlags, b16 => fragmentId, b13 => fragmentOffset, b3 => reserved}', header);
	serializer.write(buf, messageStart, 7);
	messageStart += 7;
}

var encodeControlHeader = function(controlHeader) {
	serializer.serialize('b32 => messageType, \
							  b8 => sequneceNumber, \
							  b16 => messageElementLength, \
							  b8 => flags', controlHeader);
	serializer.write(buf, messageStart, 8);
	messageStart += 8;
}

var start = 0;

var encodeTlv = function(tlv) {
	serializer.serialize('b16 => type, b16 => length, b8[' + tlv.length + '] => value', tlv);
	serializer.write(buf, messageStart + start, tlv.length + 4);
	start += (tlv.length + 4);
}

var encodeTlvArray = function(tlvArray) {
	start = 0;
	for (var i = 0; i < tlvArray.length; ++i) {
		encodeTlv(tlvArray[i]);
	}
}

var isKeepAlive = function(message) {
	return message.header.headerFlags && 0x000008;
};


var encodeMessageElementLength = function(messageElementLength) {
	serializer.serialize('b16 => messageElementLength', messageElementLength);
	serializer.write(buf, messageStart, 2);
	messageStart += 2;
};

var encodeKeepAlive = function(keepAlive) {
	encodeMessageElementLength(keepAlive.messageElementLength);
	encodeTlvArray(keepAlive.tlv);
};

exports.encode = function(message) {
	messageStart = 0;
	if (isKeepAlive(message)) {
		buf = new Buffer(message.keepAlive.messageElementLength + 8);
		encodePreamble(message.preamble);
		encodeHeader(message.header);
		encodeKeepAlive(message.keepAlive);
	} else {
		buf = new Buffer(message.controlHeader.messageElementLength + 16);
		encodePreamble(message.preamble);
		encodeHeader(message.header);
		encodeControlHeader(message.controlHeader);
		encodeTlvArray(message.tlv);
	}
	return buf;
}