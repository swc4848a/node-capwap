'use strict';

/*
    Setup mysql server (now: 172.16.94.163):
    1. mysql -u root -p
    2. grant all privileges on *.* to monitor@"172.16.94.161" identified by 'monitor';
    3. SET PASSWORD FOR 'monitor'@'172.16.94.161' = PASSWORD('pass');
    4. create database monitor;
*/

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var mysql = require('mysql');
var async = require('async');
var ProgressBar = require('progress');
const EventEmitter = require('events');
const util = require('util');
const moment = require('moment');
// var debug = require('debug')('node-capwap::logserver');

var options = {
    host: '172.16.94.163',
    user: 'monitor',
    password: 'pass',
    database: 'monitor'
};

var createMessageTableSql = 'CREATE TABLE IF NOT EXISTS ' +
    'message (' +
    'ts TIMESTAMP, ' +
    'msg_type INT UNSIGNED, ' +
    'direction SMALLINT UNSIGNED, ' +
    'apnetwork_oid INT UNSIGNED, ' +
    'ap_sn VARCHAR(32), ' +
    'sta_mac VARCHAR(18)' +
    ')';

var batchInsertMessageSql = 'INSERT INTO message (ts, msg_type, direction, apnetwork_oid, ap_sn, sta_mac) VALUES ?';

function mysqlQuery(conn, sql, post, callback) {
    var query = conn.query(sql, post, function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
        } else {
            callback(rows, fields);
        }
    });
};

var conn = mysql.createConnection(options);
conn.connect();

mysqlQuery(conn, createMessageTableSql, null, function(rows, fields) {});

// udp log server 
server.on('listening', function() {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

// {
//     "ts": 1461970334,
//     "daemon": 1,
//     "thread": 10,
//     "apnetwork_oid": 719,
//     "ap_sn": "PS321C3U15000011",
//     "sta_mac": "00:09:0f:ff:00:01",
//     "line": 863,
//     "file": "cwAcFsm.c",
//     "func": "CWAS_JOIN_enter",
//     "ssid": "null",
//     "msg_type":1,
//     "direction": 0,
//     "log": "abcdefg"
// }

var datas = [];

class Worker extends EventEmitter {};
const logWorker = new Worker();

server.on('message', function(message, remote) {
    var json = JSON.parse(message.toString('ascii'));
    if (Array.isArray(json)) {
        json.forEach(function(item, index) {
            datas.push([moment.unix(item.ts).format('YYYY-MM-DD HH:mm:ss'), item.msg_type, item.direction, item.apnetwork_oid, item.ap_sn, item.sta_mac]);
        });
    } else {
        datas.push([moment.unix(json.ts).format('YYYY-MM-DD HH:mm:ss'), json.msg_type, json.direction, json.apnetwork_oid, json.ap_sn, json.sta_mac]);
    }
    if (1000 >= datas.length) {
        logWorker.emit('insert');
    }
});

setInterval(() => {
    if (datas.length) {
        logWorker.emit('insert');
    }
}, 1000);

logWorker.on('insert', () => {
    mysqlQuery(conn, batchInsertMessageSql, [datas.splice(0)], function(rows, fields) {
        console.log('[%s] batch insert: ', new Date(), rows.affectedRows);
    });
});

server.on("error", function(err) {
    console.trace("Server Error:\n" + err.stack);
    server.close();
});

server.on("close", function(err) {
    console.log("Server close");
});

server.bind({
    port: 6060,
});
