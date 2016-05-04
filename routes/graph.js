'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res) {
    if (req.query.messageType && req.query.apnetwork && req.query.ap && req.query.start && req.query.end) {
        var options = {
            host: '172.16.94.163',
            user: 'monitor',
            password: 'pass',
            database: 'monitor'
        };
        var connection = mysql.createConnection(options);

        connection.connect();

        var whereCondition = 'msg_type="' + req.query.messageType +
            '" and apnetwork_oid="' + req.query.apnetwork +
            '" and ap_sn="' + req.query.ap +
            '" and ts between from_unixtime(' + req.query.start / 1000 + ') and from_unixtime(' + req.query.end / 1000 + ')';

        var sql = 'SELECT ts AS time, COUNT(*) as count FROM message WHERE ' + whereCondition + ' GROUP BY UNIX_TIMESTAMP(ts) DIV 3600;';

        connection.query(sql, function(err, rows, fields) {
            if (err) {
                console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
                res.json([]);
            } else {
                var json = [];
                rows.forEach(function(row, index) {
                    if (index !== rows.length - 1) {
                        var now = Math.round(row.time.getTime() / 3600000);
                        var next = Math.round(rows[index + 1].time.getTime() / 3600000);
                        var diff = next - now;
                        if (1 !== diff) {
                            json.push([row.time.getTime(), row.count]);
                            for (var i = 1; i < diff; ++i) {
                                json.push([row.time.getTime() + i * 3600000, 0]);
                            }
                        } else {
                            json.push([row.time.getTime(), row.count]);
                        }
                    } else {
                        json.push([row.time.getTime(), row.count]);
                    }
                });
                res.json(json);
            }
        });
        connection.end();
    } else {
        console.log('missing require: ' + req.query);
        res.json([]);
    }
});

module.exports = router;
