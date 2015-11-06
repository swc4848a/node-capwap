'use strict';

var _ = require('underscore');
var encoder = require('../capwap/encoder');
var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var tool = require('../capwap/tool');
var enumType = require('../capwap/enum');
var state = require('./state');
var context = require('./context');
var debug = require('debug')('node-capwap::server::session');

// var session = module.exports = {};

exports.start = function start() {
	context.init();
};

var sendDiscoverResponse = function(server, request) {
	var tlv = [
		builder.buildAcDescriptor(),
		builder.buildAcName(),
		builder.buildVspWtpAllow(request.messageElement.wtpBoardData.wtpSerialNumber.value),
	];
	var elementLength = tool.calMessageElementLength(tlv);
	var discoverResponse = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: 2,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(discoverResponse, 0, discoverResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP /* error callback */ );
	debug('Send Discover Response');
};

exports.discoveryRequestProcess = function(server, request) {
	// 1. check if ip/port used by other wtp-session
	if (context.getWtpHashByIpControlPort(context.remote.address, context.remote.port)) {
		// any discovery msg from this ip/port can take over previous wtp ws
		// todo: shutdown already running session
		return;
	}

	// 2. find wtp hash by sn
	var sn = request.messageElement.wtpBoardData.wtpSerialNumber.value;
	var wtpHash = context.getWtpHashBySn(sn);
	if (_.isUndefined(wtpHash)) {
		debug('ap serial number %s not configured.', sn);
		return;
	}

	// 3. udpate wtp hash ip and port
	wtpHash.ip = context.remote.address;
	wtpHash.port = context.remote.port;

	// 4. check account sta 
	// if request.messageElement.vsp has wbh sta

	// 5. if wtp session already start, shutdown it
	if (wtpHash.session) {
		// shutdown this session
		return;
	}

	sendDiscoverResponse(server, request);
};

exports.joinRequestProcess = function(server, request) {
	var tlv = [
		builder.buildResultCode(0), // Success
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var joinResponse = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.JOIN_RESPONSE,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(joinResponse, 0, joinResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	debug('Send Join Response');
};

exports.configurationStatusRequestProcess = function(server, request) {
	var tlv = [
		builder.buildCapwapTimers(),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var configurationStatusResponse = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.CONFIGURATION_STATUS_RESPONSE,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(configurationStatusResponse, 0, configurationStatusResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	debug('Send Configuration Status Response');
};

exports.changeStateRequestProcess = function(server, request) {
	var tlv = [
		builder.buildResultCode(0),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var changeStateResponse = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.CHANGE_STATE_RESPONSE,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(changeStateResponse, 0, changeStateResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	debug('Send Change State Response');
};

exports.keepAliveProcess = function(data, request) {
	var tlv = [
		builder.buildSessionId(),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var keepAlive = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(0x00008),
		keepAlive: {
			messageElementLength: elementLength,
			tlv: tlv
		}
	});
	data.send(keepAlive, 0, keepAlive.length, enumType.socket.CLIENT_DATA_PORT, enumType.socket.CLIENT_IP);
	debug('Send Keep Alive');
};

exports.dataChannelVerifiedProcess = function(server, request) {
	var tlv = [
		builder.buildWtpName(),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var configurationUpdateRequest = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.CONFIGURATION_UPDATE_REQUEST,
			sequneceNumber: context.sequneceNumber++,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(configurationUpdateRequest, 0, configurationUpdateRequest.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	debug("Send Configuration Update Request");
};

var addWlan = function(server, request) {
	var tlv = [
		builder.buildIeee80211AddWlan(),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var ieee80211WlanConfigurationRequest = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.IEEE_80211_WLAN_CONFIGURATION_REQUEST,
			sequneceNumber: context.sequneceNumber++,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(ieee80211WlanConfigurationRequest, 0, ieee80211WlanConfigurationRequest.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	debug("Send 802.11 WLAN Configuration Request");
};

exports.startConfigurationProcess = function(server, request) {
	// todo: if condition => start JSON data push
	// todo: addWlan need to move correct position
	addWlan(server, request);
};

exports.ieee80211ConfigurationResponseProcess = function(server, response) {
	// todo:
};

exports.wtpEventRequestProcess = function(server, request) {
	var tlv = [
		builder.buildResultCode(0),
	]
	var elementLength = tool.calMessageElementLength(tlv);
	var wtpEventResponse = encoder.encode({
		preamble: builder.getPreamble(),
		header: builder.getHeader(),
		controlHeader: {
			messageType: enumType.messageType.WTP_EVENT_RESPONSE,
			sequneceNumber: request.controlHeader.sequneceNumber,
			messageElementLength: elementLength,
			flags: 0
		},
		tlv: tlv
	});
	server.send(wtpEventResponse, 0, wtpEventResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
	debug('Send WTP Event Response');
};