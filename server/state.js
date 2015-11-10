'use strict';

var Stately = require('stately.js');
var session = require('./session');
var debug = require('debug')('node-capwap::server::state');

var state = Stately.machine({
	'START': {
		'INIT_COMPLETE': function() {
			session.start();
			return this.IDLE;
		}
	},
	'IDLE': {
		'LOCAL_WTP_CONN': function(server, request) {
			session.discoveryRequestProcess(server, request);
			return this.JOIN;
		}
	},
	'JOIN': {
		'JOIN_REQ_RECV': function(server, request) {
			session.joinRequestProcess(server, request);
			return this.JOIN;
		},
		'CFG_STATUS_REQ': function(server, request) {
			session.configurationStatusRequestProcess(server, request);
			return this.CONFIG;
		},
		'WTP_UNKNOWN': function() {

		},
		'WTP_DISABLED': function() {

		}
	},
	'CONFIG': {
		'CHG_STATE_EVENT_REQ_RECV': function(server, request) {
			session.changeStateRequestProcess(server, request);
			return this.DATA_CHAN_SETUP;
		}
	},
	'DATA_CHAN_SETUP': {
		'DATA_CHAN_KEEP_ALIVE_RECV': function(server, data, request) {
			session.keepAliveProcess(data, request);
			session.dataChannelVerifiedProcess(server, request);
			return this.RUN;
		},
	},
	'RUN': {
		'CFG_UPDATE_RESP_RECV': function(server, response) {
			session.startConfigurationProcess(server, response);
			return this.RUN;
		},
		'IEEE_80211_WLAN_CFG_RESP_RC_SUCC': function(server, response) {
			session.ieee80211ConfigurationResponseProcess(server, response);
			return this.RUN;
		},
		'WTP_EVENT_REQ_RECV': function(server, request) {
			session.wtpEventRequestProcess(server, request);
			return this.RUN;
		}
	}
});

state.bind(function(event, oldState, newState) {
	var transition = event + ': ' + oldState + ' => ' + newState;
	switch (transition) {
		default: {
			debug(transition);
		}
		break;
	}
});

module.exports = state;