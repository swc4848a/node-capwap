'use strict';

var _ = require('underscore');
var debug = require('debug')('node-capwap::server::context');

var context = exports = module.exports = {};

context.init = function init() {
	this.sequenceNumber = 0;
	this.wtpHash = [];
};

context.getWtpHashByIpControlPort = function getWtpHashByIpControlPort(ip, port) {
	return _.findWhere(this.wtpHash, {
		address: ip,
		port: port
	});
};