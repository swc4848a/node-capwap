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
		'DISCOVERY_RESP_RECV': function(context) {
			clearTimeout(context.discoveryTimer);
			// console.log(util.inspect(response, false, null));
			return this.END;
		}
	},
	'END': {
		'*': function() {
			console.log('do nothing');
		}
	}
});

state.bind(function(event, oldState, newState) {
	var transition = event + ': ' + oldState + ' => ' + newState;
	switch (transition) {
		default: {
			console.log(transition);
		}
		break;
	}
});

module.exports = state;