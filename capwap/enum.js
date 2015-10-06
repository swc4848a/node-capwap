exports.tlvType = {
	DISCOVERY_TYPE: 20,
	LOCATION_DATA: 28,
};

exports.discoveryType = {
	STATIC_CONFIGURATION: 1
};

exports.timer = {
	MAX_RETRY: 3
};

exports.socket = {
	SERVER_PORT: 15246, // should be 5246 => debug use only
	SERVER_IP: 'localhost',
	CLIENT_PORT: 10002,
	CLIENT_IP: 'localhost',
};

exports.messageType = {
	DISCOVER_REQUEST: 1,
	DISCOVER_RESPONSE: 2,
	JOIN_REQUEST: 3,
};