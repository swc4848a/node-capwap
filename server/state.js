'use strict';

var Stately = require('stately.js');
var session = require('./session');

var state = Stately.machine({
	'START': {
		'INIT_COMPLETE': function() {
			return this.IDLE;
		}
	},
	'IDLE': {
		'LOCAL_WTP_CONN': function() {
			return this.JOIN;
		}
	},
	'JOIN': {
		'JOIN_REQ_RECV': function(server, request) {
			session.joinRequestProcess(server, request);
			return this.CONFIG;
		}
	},
	'CONFIG': {
		'CFG_STATUS_REQ': function(server, request) {
			session.configurationStatusRequestProcess(server, request);
			return this.DATA_CHAN_SETUP;
		}
	},
	'DATA_CHAN_SETUP': {
		'CHG_STATE_EVENT_REQ_RECV': function(server, request) {
			session.changeStateRequestProcess(server, request);
		}
	}
});

state.bind(function(event, oldState, newState) {
	var transition = event + ': ' + oldState + ' => ' + newState;
	switch (transition) {
		default: {
			console.log('Server: ' + transition);
		}
		break;
	}
});

module.exports = state;