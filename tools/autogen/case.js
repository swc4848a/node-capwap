'use strict';

let cases = require('./it/root.js');

require('./it/interfaces.js');
require('./it/dns.js');
require('./it/routing.js');
require('./it/adminSettings.js');
require('./it/fortiGuard.js');
require('./it/advanced.js');
require('./it/addresses.js');
require('./it/services.js');
require('./it/schedules.js');

// cases = require('./it/webFilter.js');
// cases = require('./it/dnsFilter.js');
// cases = require('./it/applicationControl.js');
// cases = require('./it/casi.js');
// cases = require('./it/proxyOptions.js');

// require('./it/sslInspection.js');
// require('./it/webRatingOverrides.js');
// require('./it/webProfileOverrides.js');
// require('./it/usersGroups.js');
// require('./it/customDevicesGroups.js');
// require('./it/ldapServers.js');
// require('./it/radiusServers.js');
// require('./it/authenticationSettings.js');

// filter some can't support testcases
// need reference interface
delete cases['interface hardswitch new'];
delete cases['interface softswitch new'];

// todo: temorary delete this case, category can't delete via GUI
delete cases['category new'];
delete cases['web profile overrides new user'];

delete cases['advanced time setting use fortiguard'];
delete cases['advanced time setting specify'];

module.exports = cases;
