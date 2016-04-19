'use strict';

var express = require('express');
var router = express.Router();
var dgram = require('dgram');
var mysql = require('mysql');

// var message = new Buffer(JSON.stringify({
// 	method: 'get',
// 	url: '/debug/tracePacketShmDump/',
// 	apNetworkOid: 100,
// 	id: 1
// }));

// var client = dgram.createSocket('udp4');
// client.bind(65534);

// client.send(message, 0, message.length, 9688, '172.16.94.163');

// client.on('message', function(message, remote) {
// 	res.json(JSON.parse(message.toString()));
// 	client.close();
// });

// client.on("error", function(err) {
// 	console.trace("client Error:\n" + err.stack);
// 	client.close();
// });

router.get('/', function(req, res) {
    // do sql query
    var connection = mysql.createConnection({
        host: '172.16.95.95',
        user: 'forticrm',
        password: 'forticrm',
        database: 'acct000556'
    });

    connection.connect();

    connection.query('SELECT * from wlTraffic LIMIT 5', function(err, rows, fields) {
        if (err) {
            throw err;
        }
        res.json(rows);
    });

    connection.end();
});

module.exports = router;
