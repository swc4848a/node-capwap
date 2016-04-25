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

    var sql = 'SELECT time AS time, COUNT(*) AS count FROM message GROUP BY UNIX_TIMESTAMP(time) DIV 60;';
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            var json = [];
            rows.forEach(function(item, index) {
                json.push([Date.parse(item.time), item.count]);
            });
            res.json(json);
        }
    });

    connection.end();
});

module.exports = router;
