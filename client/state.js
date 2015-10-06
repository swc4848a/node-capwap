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