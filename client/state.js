'use strict';

var Stately = require('stately.js');
var session = require('./session');
var debug = require('debug')('node-capwap::client::state');

var state = Stately.machine({
	'START': {
		'INIT_COMPLETE': function(client, context) {
			session.create(client, context);
			return this.DISCOVERY;
		}
	},
	'DISCOVERY': {
		'DISCOVERY_RESP_RECV': function(client, context) {
			clearTimeout(context.discoveryTimer);
			session.startJoin(client, context);
			return this.JOIN;
		}
	},
	'JOIN': {
		'JOIN_RESP_RC_SUCC_IMAGE_SAME': function(client, context) {
			session.startConfig(client, context);
			return this.CONFIG;
		}
	},
	'CONFIG': {
		'CONFIG_STATUS_RESP_SUCC': function(client, context) {
			session.startChange(client, context);
			return this.DATA_CHECK;
		}
	},
	'DATA_CHECK': {
		'CHANGE_STATE_EVENT_RC_SUCC': function(data, context) {
			session.startKeepAlive(data, context);
			return this.RUN;
		}
	},
	'RUN': {
		'DATA_CHAN_KEEP_ALIVE_RECV': function(data, context) {
			return this.RUN;
		},
		'CFG_UPDATE_REQ_RECV': function(client, message) {
			session.configurationUpdateRequestProcess(client, message);
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