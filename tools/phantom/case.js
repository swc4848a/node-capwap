'use strict';

let cases = require('./it/root.js');

require('./it/interfaces.js');
require('./it/dns.js');
require('./it/routing.js');
require('./it/adminSettings.js');
require('./it/fortiGuard.js');

// todo: gwt collpase plus icon can't response jquery click event
// require('./it/advanced.js');

// support template
require('./it/addresses.js');
require('./it/services.js');
require('./it/schedules.js');
require('./it/virtualIPs.js');
require('./it/ipPools.js');
require('./it/antiVirus.js');
require('./it/webFilter.js');
require('./it/usersGroups.js');
require('./it/intrusionProtection.js');
require('./it/applicationControl.js');
require('./it/webRatingOverrides.js');
require('./it/customDevicesGroups.js');
require('./it/ldapServers.js');
require('./it/radiusServers.js');
require('./it/authenticationSettings.js');

// bugs:
require('./it/dnsFilter.js');

// more case:
require('./it/sslInspection.js');

// todo:

// remove from v3.2.1
// cases = require('./it/casi.js');
// require('./it/proxyOptions.js');
// require('./it/webProfileOverrides.js');

// filter some can't support testcases
// need reference interface
delete cases['interface hardswitch new'];
delete cases['interface softswitch new'];

// todo: extintf any problem
delete cases['virtual ip new'];
delete cases['virtual ip delete'];

delete cases['web profile overrides new user'];

delete cases['advanced time setting use fortiguard'];
delete cases['advanced time setting specify'];

module.exports = cases;
