'use strict';

var _ = require('underscore');
var debug = require('debug')('node-capwap::server::context');

var context = exports = module.exports = {};

context.init = function init() {
	this.sequenceNumber = 0;
	this.wtpHash = [{
		sn: 'FP320C3X14012026'
	}];
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