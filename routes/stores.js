'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/Raws', function(req, res) {
    var options = {
        host: '192.168.223.188',
        user: 'monitor',
        password: 'pass',
        database: 'monitor'
    };

    if (req.query.start && req.query.end) {
        var start = req.query.start;
        var end = req.query.end;

        var connection = mysql.createConnection(options);

        connection.connect();

        let sql = 'SELECT * FROM message WHERE ts BETWEEN from_unixtime(' + start / 1000 + ') and from_unixtime(' + end / 1000 + ') limit 1500;';

        connection.query(sql, function(err, rows, fields) {
            if (err) {
                console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
                res.json([]);
            } else {
                rows.forEach(function(row, index) {
                    row.ts = row.ts.toLocaleString();
                });
                res.json(rows);
            }
        });

        connection.end();
    } else {
        console.log('missing require: ' + req.query);
        res.json([]);
    }
});

module.exports = router;
