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
		'JOIN_REQ_RECV': function(request) {
			session.joinRequestProcess(request);
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