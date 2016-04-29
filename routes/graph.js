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

    if (req.query.messageType && req.query.apnetwork && req.query.ap && req.query.start && req.query.end) {
        var whereCondition = 'messageType="' + req.query.messageType +
            '" and apnetwork="' + req.query.apnetwork +
            '" and ap="' + req.query.ap +
            '" and time between from_unixtime(' + req.query.start / 1000 + ') and from_unixtime(' + req.query.end / 1000 + ')';

        var sql = 'SELECT time AS time, COUNT(*) AS count FROM message WHERE ' + whereCondition + ' GROUP BY UNIX_TIMESTAMP(time) DIV 3600;';

        connection.query(sql, function(err, rows, fields) {
            if (err) {
                console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
                res.json([]);
            } else {
                var json = [];
                rows.forEach(function(row, index) {
                    json.push([row.time.getTime(), row.count]);
                });
                res.json(json);
            }
        });

        connection.end();
    } else {
        console.log('require start and end: ' + req.query);
        res.json([]);
    }
});

module.exports = router;
