'use strict';

var _ = require('underscore');
var debug = require('debug')('node-capwap::server::context');

var context = exports = module.exports = {};

context.init = function init() {
	this.sequenceNumber = 0;
	this.wtpHash = [{
		address: '127.0.0.1',
		port: 10002
	}];
};

context.getWtpHashByIpControlPort = function getWtpHashByIpControlPort(ip, port) {
	_.each(this.wtpHash, function(elem) {
		if (_.isMatch(elem, {
				address: ip,
				port: port
			})) {
			// todo: async callback refact
			return true;
		}
	});
	return false;
};