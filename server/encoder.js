var serializer = require("packet").createSerializer();
var buf;

var encodePreamble = function(preamble) {
	serializer.serialize('b8{b4 => version, b4 => type}', preamble);
	serializer.write(buf, 0, 1);
}

var encodeHeader = function(header) {
	serializer.serialize('b56{b5 => headerLength, b5 => radioId, b5 => wirelessBindId, b9 => headerFlags, b16 => fragmentId, b13 => fragmentOffset, b3 => reserved}', header);
	serializer.write(buf, 1, 7);
}

var encodeControlHeader = function(controlHeader) {
	serializer.serialize('b32 => messageType, \
							  b8 => sequneceNumber, \
							  b16 => messageElementLength, \
							  b8 => flags', controlHeader);
	serializer.write(buf, 8, 8);
}

var start = 0;

var encodeTlv = function(tlv) {
	serializer.serialize('b16 => type, b16 => length, b8[' + tlv.length + '] => value', tlv);
	serializer.write(buf, 16 + start, tlv.length + 4);
	start += (tlv.length + 4);
}

var encodeTlvArray = function(tlvArray) {
	start = 0;
	for (var i = 0; i < tlvArray.length; ++i) {
		encodeTlv(tlvArray[i]);
	}
}

exports.encode = function(message) {
	buf = new Buffer(message.controlHeader.messageElementLength + 16);
	encodePreamble(message.preamble);
	encodeHeader(message.header);
	encodeControlHeader(message.controlHeader);
	encodeTlvArray(message.tlv);
	return buf;
}