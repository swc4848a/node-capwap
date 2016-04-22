'use strict';

var express = require('express');
var router = express.Router();

var mock = [
    { type: 'JOIN_REQ', label: 'Join Request', direction: '<== ws', apnetwork: 662, sn: 'FP320CZQQ1000001', ip: '172.16.95.182', port: 10002 },
    { type: 'JOIN_RESP', label: 'Join Response', direction: '==> ws', apnetwork: 662, sn: 'FP320CZQQ1000001', ip: '172.16.95.182', port: 10002 }
];

router.get('/', function(req, res) {
    res.json(mock);
});

module.exports = router;
