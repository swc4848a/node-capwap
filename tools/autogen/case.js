'use strict';

let cases = require('./it/setup.js');


cases = require('./it/interfaces.js');
cases = require('./it/services.js');
cases = require('./it/schedules.js');
cases = require('./it/adminSettings.js');
cases = require('./it/routing.js');
cases = require('./it/dns.js');
cases = require('./it/fortiGuard.js');
cases = require('./it/advanced.js');
cases = require('./it/addresses.js');
cases = require('./it/webFilter.js');
cases = require('./it/dnsFilter.js');
cases = require('./it/applicationControl.js');
cases = require('./it/casi.js');
cases = require('./it/proxyOptions.js');

require('./it/sslInspection.js');
require('./it/webRatingOverrides.js');
require('./it/webProfileOverrides.js');
require('./it/usersGroups.js');
require('./it/customDevicesGroups.js');
require('./it/ldapServers.js');
require('./it/radiusServers.js');


cases = require('./it/deploy.js');

// delete cases['deploy'];
// delete cases[];

module.exports = cases;
