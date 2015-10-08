exports.tlvType = {
	CAPWAP_TIMERS: 12,
	DISCOVERY_TYPE: 20,
	LOCATION_DATA: 28,
	RESULT_CODE: 33,
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
	DISCOVERY_REQUEST: 1,
	DISCOVERY_RESPONSE: 2,
	JOIN_REQUEST: 3,
	JOIN_RESPONSE: 4,
	CONFIGURATION_STATUS_REQUEST: 5,
	CONFIGURATION_STATUS_RESPONSE: 6,
};