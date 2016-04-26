'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/apnetwork', function(req, res) {
    var options = {
        host: '172.16.95.95',
        user: 'forticrm',
        password: 'forticrm',
        database: 'portal'
    };
    var connection = mysql.createConnection(options);

    connection.connect();

    connection.query('SELECT oid AS VALUE, NAME AS label FROM ap_network LIMIT 10', function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            res.json(rows);
        }
    });

    connection.end();
});

router.get('/ap', function(req, res) {
    var options = {
        host: '172.16.95.95',
        user: 'forticrm',
        password: 'forticrm',
        database: 'portal'
    };
    var connection = mysql.createConnection(options);

    connection.connect();

    connection.query('SELECT oid AS VALUE, NAME AS label FROM ap_ap LIMIT 10', function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            res.json(rows);
        }
    });

    connection.end();
});

router.get('/messageType', function(req, res) {
    res.json([{
        label: 'Discovery Request',
        value: 'DISCOVERY_REQ'
    }, {
        label: 'Echo Request',
        value: 'ECHO_REQ'
    }]);
});

module.exports = router;
