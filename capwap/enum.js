'use strict';

exports.tlvType = {
	CAPWAP_TIMERS: 12,
	DISCOVERY_TYPE: 20,
	LOCATION_DATA: 28,
	RESULT_CODE: 33,
	SESSION_ID: 35,
	WTP_NAME: 45,
	IEEE_80211_ADD_WLAN: 1024,
	IEEE_80211_WTP_RADIO_CONFIGURATION: 1046,
	IEEE_80211_WTP_RADIO_INFORMATION: 1048
};

exports.discoveryType = {
	STATIC_CONFIGURATION: 1
};

exports.timer = {
	MAX_RETRY: 3
};

exports.socket = {
	SERVER_CTRL_PORT: 15246, // should be 5246 => debug use only
	SERVER_DATA_PORT: 15247, // should be 5247 => debug use only
	SERVER_IP: 'localhost',
	CLIENT_PORT: 10002,
	CLIENT_DATA_PORT: 10003,
	CLIENT_IP: 'localhost',
};

exports.messageType = {
	DISCOVERY_REQUEST: 1,
	DISCOVERY_RESPONSE: 2,
	JOIN_REQUEST: 3,
	JOIN_RESPONSE: 4,
	CONFIGURATION_STATUS_REQUEST: 5,
	CONFIGURATION_STATUS_RESPONSE: 6,
	CONFIGURATION_UPDATE_REQUEST: 7,
	CONFIGURATION_UPDATE_RESPONSE: 8,
	WTP_EVENT_REQUEST: 9,
	WTP_EVENT_RESPONSE: 10,
	CHANGE_STATE_REQUEST: 11,
	CHANGE_STATE_RESPONSE: 12,
	IEEE_80211_WLAN_CONFIGURATION_REQUEST: 3398913,
	IEEE_80211_WLAN_CONFIGURATION_RESPONSE: 3398914
};

exports.wtpAdminState = {
	WTP_ADMIN_DISCOVERY: 1,
	WTP_ADMIN_DISABLE: 2,
	WTP_ADMIN_ENABLE: 3
};

exports.wtpRadioMode = {
	RMODE_NODEV: 0,
	RMODE_DISABLED: 1,
	RMODE_WTP: 2,
	RMODE_WTP_LAN: 3,
	RMODE_MONITOR: 4,
	RMODE_SNIFFER: 5
};

exports.wtpRadioType = {
	CW_11_RADIO_TYPE_11b: 0x01,
	CW_11_RADIO_TYPE_11a: 0x02,
	CW_11_RADIO_TYPE_11g: 0x04,
	CW_11_RADIO_TYPE_11n: 0x08,
	CW_11_RADIO_TYPE_11ac: 0x10,
	CW_11_RADIO_TYPE_11ac_2G: 0x2010,
	CW_11_RADIO_TYPE_11n_5G: 0x5008,
	CW_11_RADIO_TYPE_PURE: 0x8000,
	CW_11_RADIO_TYPE_MASK: 0xFFF,
	// CW_11_RADIO_TYPE_11acn_only: (CW_11_RADIO_TYPE_11ac | CW_11_RADIO_TYPE_11n | CW_11_RADIO_TYPE_PURE),
	// CW_11_RADIO_TYPE_11ac_only: (CW_11_RADIO_TYPE_11ac | CW_11_RADIO_TYPE_PURE),
	// CW_11_RADIO_TYPE_11ng_only: (CW_11_RADIO_TYPE_11g | CW_11_RADIO_TYPE_11n | CW_11_RADIO_TYPE_PURE),
	// CW_11_RADIO_TYPE_11g_only: (CW_11_RADIO_TYPE_11g | CW_11_RADIO_TYPE_PURE),
	// CW_11_RADIO_TYPE_11n_only: (CW_11_RADIO_TYPE_11n | CW_11_RADIO_TYPE_PURE),
	// CW_11_RADIO_TYPE_11n_5G_only: (CW_11_RADIO_TYPE_11n_5G | CW_11_RADIO_TYPE_PURE),
	// CW_11_RADIO_TYPE_11bg: (CW_11_RADIO_TYPE_11b | CW_11_RADIO_TYPE_11g),
	// CW_11_RADIO_TYPE_11abg: (CW_11_RADIO_TYPE_11b | CW_11_RADIO_TYPE_11a | CW_11_RADIO_TYPE_11g)
};

exports.apScanType = {
	CW_AP_SCAN_DISABLE: 0,
	CW_AP_SCAN_BG: 1, //scan at idle time
	CW_AP_SCAN_FG: 2,
	CW_AP_SCAN_BG2: 3, //scan at regular time
	CW_AP_SCAN_FG2: 4, //sniffer
	CW_AP_SCAN_ENABLE: 5
};