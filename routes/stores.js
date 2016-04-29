'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/Raws', function(req, res) {
    var options = {
        host: '172.16.94.163',
        user: 'monitor',
        password: 'pass',
        database: 'monitor'
    };

    if (req.query.start && req.query.end) {
        var start = req.query.start;
        var end = req.query.end;

        var connection = mysql.createConnection(options);

        connection.connect();

        let sql = 'SELECT * FROM raw WHERE time BETWEEN from_unixtime(' + start / 1000 + ') and from_unixtime(' + end / 1000 + ');';

        connection.query(sql, function(err, rows, fields) {
            if (err) {
                console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
                res.json([]);
            } else {
                rows.forEach(function(row, index) {
                    var dateStr = new Date(row.time);
                    row.time = dateStr.toLocaleString();
                });
                res.json(rows);
            }
        });

        connection.end();
    } else {
        console.log('require start and end: ' + req.query);
        res.json([]);
    }
});

module.exports = router;
