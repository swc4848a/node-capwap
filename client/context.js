'use strict';

var _ = require('underscore');

var context = {
	discoveryCount: 0,
	discoveryTimer: 0,
	sequenceNumber: _.random(0, 100)
};