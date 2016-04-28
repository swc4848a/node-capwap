'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res) {
    var options = {
        host: '172.16.94.163',
        user: 'monitor',
        password: 'pass',
        database: 'monitor'
    };

    var connection = mysql.createConnection(options);

    connection.connect();

    let sql = 'SELECT * FROM raw limit 10000';

    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            res.json(rows);
        }
    });

    connection.end();
});

module.exports = router;
