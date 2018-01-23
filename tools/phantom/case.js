'use strict';

let cases = require('./it/root.js');

require('./it/interfaces.js'); // failed, interface attr should be oid
require('./it/dns.js'); // 
require('./it/routing.js'); // failed
require('./it/adminSettings.js'); //failed
require('./it/fortiGuard.js'); //

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
require('./it/dnsFilter.js');

// more case:
// require('./it/sslInspection.js');

// remove from v3.2.1
// cases = require('./it/casi.js');
// require('./it/proxyOptions.js');
// require('./it/webProfileOverrides.js');

// filter some can't support testcases
delete cases['interface hardswitch new'];
delete cases['interface softswitch new'];

module.exports = cases;
