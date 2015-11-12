'use strict';

var _ = require('underscore');
var enumType = require('../capwap/enum');
var debug = require('debug')('node-capwap::server::context');

var context = exports = module.exports = {};

context.init = function init() {
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