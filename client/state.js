var Stately = require('stately.js');
var session = require('./session');

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
			return this.DATA_CHECK;
		}
	},
	'DATA_CHECK': {

	}
});

state.bind(function(event, oldState, newState) {
	var transition = event + ': ' + oldState + ' => ' + newState;
	switch (transition) {
		default: {
			console.log('Client: ' + transition);
		}
		break;
	}
});

module.exports = state;