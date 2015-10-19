'use strict';

var _ = require('underscore');
var debug = require('debug')('node-capwap::capwap::tool');
var util = require('util');

exports.calMessageElementLength = function(element) {
	var len = 0
	for (var i = 0; i < element.length; ++i) {
		len += element[i].length;
	}
	return 4 * i + len;
};

exports.inspectObject = function(obj) {
	debug(util.inspect(obj, {
		showHidden: true,
		depth: null
	}));
};