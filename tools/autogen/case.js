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
cases = require('./it/deploy.js');

// delete cases['deploy'];
// delete cases[];

module.exports = cases;
