'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/apnetwork', function(req, res) {
    // do sql query
    var connection = mysql.createConnection({
        host: '172.16.95.95',
        user: 'forticrm',
        password: 'forticrm',
        database: 'portal'
    });

    connection.connect();

    connection.query('SELECT oid AS VALUE, NAME AS label FROM ap_network LIMIT 10', function(err, rows, fields) {
        if (err) {
            console.log(err.message);
            res.json([]);
        } else {
            res.json(rows);
        }
    });

    connection.end();
});

router.get('/ap', function(req, res) {
    // do sql query
    var connection = mysql.createConnection({
        host: '172.16.95.95',
        user: 'forticrm',
        password: 'forticrm',
        database: 'portal'
    });

    connection.connect();

    connection.query('SELECT oid AS VALUE, NAME AS label FROM ap_ap LIMIT 10', function(err, rows, fields) {
        if (err) {
            console.log(err.message);
            res.json([]);
        } else {
            res.json(rows);
        }
    });

    connection.end();
});

module.exports = router;
