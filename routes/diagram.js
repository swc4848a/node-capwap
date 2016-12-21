'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res) {
    if (req.query.apnetwork && req.query.ap && req.query.start && req.query.end) {
        var options = {
            host: '172.16.94.164',
            user: 'monitor',
            password: 'pass',
            database: 'monitor'
        };
        var connection = mysql.createConnection(options);

        connection.connect();
        var whereCondition = 'apnetwork_oid="' + req.query.apnetwork +
            '" and ap_sn="' + req.query.ap +
            '" and ts between from_unixtime(' + req.query.start / 1000 + ') and from_unixtime(' + req.query.end / 1000 + ')';

        var sql = 'SELECT ts AS time, msg_type AS label, direction FROM message WHERE ' + whereCondition + ' limit 200;';

        connection.query(sql, function(err, rows, fields) {
            if (err) {
                console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
                res.json([]);
            } else {
                var json = [];
                rows.forEach(function(row, index) {
                    json.push({
                        time: row.time.toLocaleString(),
                        label: row.label,
                        direction: row.direction
                    });
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
