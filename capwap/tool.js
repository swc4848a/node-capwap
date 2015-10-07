var _ = require('underscore');

exports.calMessageElementLength = function(element) {
	var len = 0
	for (var i = 0; i < element.length; ++i) {
		len += element[i].length;
	}
	return 4 * i + len;
};