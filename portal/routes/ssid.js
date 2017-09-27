'use strict';

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const mock = {
    ssids: []
}

const security = {
    1: 'WPA2-Enterprise'
}

const auth = {
    1: 'FortiCloud User/Group'
}

const nat = {
    0: 'Bridge',
}

router.get('/', function(req, res) {
    if (process.argv[2] === 'home') {
        return res.json(mock);
    }

    const connection = mysql.createConnection({
        host: '172.16.95.95',
        user: 'forticrm',
        password: 'forticrm',
        database: 'portal'
    });

    connection.connect();

    connection.query('SELECT * FROM ap_ssid WHERE apNetworkOid = 793', function(error, results, fields) {
        if (error) throw error;
        let ssids = [];
        results.map((result) => {
            ssids.push({
                ssid: result.ssid,
                authentication: `${security[result.security]} ${auth[result.auth]}`,
                ipAssignment: `${nat[result.nat]}(VLAN ID:${result.vlanId ? result.vlanId : 0})`,
                apTags: `${result.apAuto ? '<Available to all APs>' : ''}`,
            });
        })
        res.json({
            ssids: ssids
        });
    });

    connection.end();
});

module.exports = router;