'use strict';

var _ = require('underscore');
var enumType = require('../capwap/enum');
var debug = require('debug')('node-capwap::server::context');

// var context = exports = module.exports = {};

module.exports = Context;

function Context(ip, port) {
	this.ip = ip;
	this.port = port;
	this.state = new State();
	this.setup();
}

Context.prototype.setup = function() {
	this.sequenceNumber = 0;
	this.wtpHash = [{
		sn: 'FP320C3X14012026',
		adminState: 0,
		radio: [{
			mode: enumType.wtpRadioMode.RMODE_WTP,
			type: enumType.wtpRadioType.CW_11_RADIO_TYPE_11a
		}, {

		}]
	}];
	this.state.INIT_COMPLETE();
};

context.getWtpHashByIpControlPort = function getWtpHashByIpControlPort(ip, port) {
	return _.findWhere(this.wtpHash, {
		address: ip,
		port: port
	});
};

context.getWtpHashBySn = function getWtpHashBySn(sn) {
	return _.findWhere(this.wtpHash, {
		sn: sn
	});
};

context.addIpControlPortToWtpHash = function addIpControlPortToWtpHash(wtpHash) {

};

context.addIpPortHashEntry = (ip, port) => {

}