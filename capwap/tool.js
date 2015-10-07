var _ = require('underscore');
var util = require('util');

exports.calMessageElementLength = function(element) {
	var len = 0
	for (var i = 0; i < element.length; ++i) {
		len += element[i].length;
	}
	return 4 * i + len;
};

exports.inspectObject = function(obj) {
	console.log(util.inspect(obj, {
		showHidden: true,
		depth: null
	}));
};