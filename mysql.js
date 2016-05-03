'use strict';

/*
    Setup mysql server (now: 172.16.94.163):
    1. mysql -u root -p
    2. grant all privileges on *.* to monitor@"172.16.94.161" identified by 'monitor';
    3. SET PASSWORD FOR 'monitor'@'172.16.94.161' = PASSWORD('pass');
    4. create database monitor;
*/

var fs = require('fs');
var mysql = require('mysql');
var async = require('async');
var ProgressBar = require('progress');

var connection;
var raws = [];
var messages = [];
var ieee80211mgmts = [];

var options = {
    host: '172.16.94.163',
    user: 'monitor',
    password: 'pass',
    database: 'monitor'
};

function mysqlQuery(sql, post, callback) {
    var query = connection.query(sql, post, function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
        } else {
            callback(rows, fields);
        }
    });
    // console.log(query.sql);
};

function parseLine(line) {
    var beforeRules = [
        // for color log
        /\(.*?\)\[(.*?)\s-\s+(.*?)\] \[thread:(\d+)\]\s+\[\d;\d+m(.*)/,
        // for raw log
        /\(.*?\)\[(.*?)\s-\s+(.*?)\] \[thread:(\d+)\]\s+(.*)/,
        // support no thread version
        /\(.*?\)\[(.*?)\s-\s+(.*?)\]\s+\[\d;\d+m(.*)/,
        /\(.*?\)\[(.*?)\s-\s+(.*?)\]\s+(.*)/,
    ];

    var rules = [
        // for capwap message
        /\(.*?\)\[(.*?)\s-\s.*?\] \[.*?\] .*?: <msg> (\w+) \(\d+\) (<==|==>)\s+ws \((\d+)-(\w+)-(\d.+):(\d+)\)/,
        /\(.*?\)\[(.*?)\s-\s.*?\] \[.*?\] .*? ws \(\d+-\d.+:\d+\)\s+<msg>\s+(\w+)\s+(==>|<==)\s+ws\s+\((\d+)-(\w+)-(\d.+):(\d+)\)/,
    ];

    var ieee80211Rules = [
        // for IEEE 802.11 mgmt
        /\(.*?\)\[(.*?)\s-\s+.*?\]\s+\[\d;\d+m\d.+\s+(.*?)\s+<ih>\s+(.*?)\s+(<==|==>)\s+.*?\s+ws\s+\((\d+)\s+-(\d.+):(\d+)\)\s+vap\s+(\w+)\srId\s(\d+)\swId\s(\d+)\s+(.*:?)/
    ];

    var exceptRules = [
        // for some exception
        // Join Response
        /\(.*?\)\[(.*?)\s+-\s+.*?\]\s+\[thread:\d+\]\s+\d.+\s+ws\s+\((\d+)-(\d.+):\d+\)\s+CWAS_JOIN_enter: sending JOIN RESP msg. RC=0\(Success\)/,
        // Configuration Status Response
        /\(.*?\)\[(.*?)\s+-\s+.*?\]\s+\[thread:\d+\]\s+\d.+\s+ws\s+\((\d+)-(\d.+):\d+\)\s+CWAS_CONFIG_enter: sending CONFIG STATUS RESP msg./,
        // Configuration Update Request
        /\(.*?\)\[(.*?)\s+-\s+.*?\]\s+\[thread:\d+\]\s+\d.+\s+ws\s+\((\d+)-(\d.+):\d+\)\s+cwAcSend_REQ_MSG: sending CFG_UPDATE_REQ \(7\) msg./,
    ];

    for (var i = 0; i < beforeRules.length; ++i) {
        var parts = line.match(beforeRules[i]);
        if (parts) {
            // time: parts[1],
            // level: parts[2],
            // thread: parts[3],
            // log: parts[4],
            raws.push([parts[1], parts[2], parts[3], parts[4]]);
            break;
        }
    }

    for (var i = 0; i < rules.length; ++i) {
        var parts = line.match(rules[i]);
        if (parts) {
            // time: parts[1],
            // messageType: parts[2],
            // direction: parts[3],
            // apnetwork: parts[4],
            // ap: parts[5],
            // ip: parts[6],
            // port: parts[7],
            messages.push([parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7]]);
            break;
        }
    }

    for (var i = 0; i < ieee80211Rules.length; ++i) {
        var parts = line.match(ieee80211Rules[i]);
        if (parts) {
            // time: parts[1],
            // stamac: parts[2],
            // messageType: parts[3],
            // direction: parts[4],
            // apnetwork: parts[5],
            // ip: parts[6],
            // port: parts[7],
            // iface: parts[8],
            // radioId: parts[9],
            // wlanId: parts[10],
            // bssid: parts[11],
            ieee80211mgmts.push([parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8], parts[9], parts[10], parts[11]]);
            break;
        }
    }

    var parts = line.match(exceptRules[0]);
    if (parts && messages.length) {
        // use last collection information
        var ap = messages[messages.length - 1][4];
        var port = messages[messages.length - 1][6];
        messages.push([parts[1], 'JOIN_RESP', '==>', parts[2], ap, parts[3], port]);
        return;
    }

    parts = line.match(exceptRules[1]);
    if (parts && messages.length) {
        var ap = messages[messages.length - 1][4];
        var port = messages[messages.length - 1][6];
        messages.push([parts[1], 'CFG_STATUS_RESP', '==>', parts[2], ap, parts[3], port]);
        return;
    }

    parts = line.match(exceptRules[2]);
    if (parts && messages.length) {
        var ap = messages[messages.length - 1][4];
        var port = messages[messages.length - 1][6];
        messages.push([parts[1], 'CFG_UPDATE_REQ', '==>', parts[2], ap, parts[3], port]);
        return;
    }
};

var batchInsertRawSql = 'INSERT INTO raw (time, level, thread, log) VALUES ?';
var batchInsertColSql = 'INSERT INTO message (time, messageType, direction, apnetwork, ap, ip, port) VALUES ?';
var batchInsertIeeeSql = 'INSERT INTO ieee80211mgmt (time, stamac, messageType, direction, apnetwork, ip, port, iface, radioId, wlanId, bssid) VALUES ?';

function parseFile(file, callback) {
    var bar;

    fs.readFile(file, 'utf8', (err, data) => {
        if (!err) {
            var lines = data.match(/[^\r\n]+/g);

            bar = new ProgressBar('  processing [' + file + '][:bar] :current :total :elapsed :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 100,
                total: lines.length
            });

            lines.forEach(function(line, index) {
                parseLine(line);
                if (0 === index % 1000) {
                    if (messages.length) {
                        mysqlQuery(batchInsertColSql, [messages], function(rows, fields) {});
                        messages = [];
                    }
                    if (raws.length) {
                        mysqlQuery(batchInsertRawSql, [raws], function(rows, fields) {
                            bar.tick(1000);
                        });
                        raws = [];
                    }
                    if (ieee80211mgmts.length) {
                        mysqlQuery(batchInsertIeeeSql, [ieee80211mgmts], function(rows, fields) {});
                        ieee80211mgmts = [];
                    }
                }
            });

            return callback();
        } else {
            if ('ENOENT' === err.code) {
                return callback();
            } else {
                return callback(err);
            }
        }
    });
};

var fileBase = 'D:\\Workspaces\\Project\\log\\monitor\\capwap.';

var createMessageTableSql = 'CREATE TABLE IF NOT EXISTS ' +
    'message (' +
    'time TIMESTAMP, ' +
    'messageType varchar(32), ' +
    'direction varchar(3), ' +
    'apnetwork INT(10), ' +
    'ap varchar(32), ' +
    'ip varchar(15), ' +
    'port smallint(5)' +
    ')';

var createIeeeMgmtTableSql = 'CREATE TABLE IF NOT EXISTS ' +
    'ieee80211mgmt (' +
    'time TIMESTAMP, ' +
    'stamac varchar(18), ' +
    'messageType varchar(32), ' +
    'direction varchar(3), ' +
    'apnetwork INT(10), ' +
    'ip varchar(15), ' +
    'port smallint(5), ' +
    'iface varchar(12), ' +
    'radioId smallint(5), ' +
    'wlanId smallint(5), ' +
    'bssid varchar(18)' +
    ')';

var createRawTableSql = 'CREATE TABLE IF NOT EXISTS ' +
    'raw (' +
    'time TIMESTAMP, ' +
    'level varchar(16), ' +
    'thread smallint(5), ' +
    'log varchar(1024)' +
    ')';

function main() {
    connection = mysql.createConnection(options);
    connection.connect();

    mysqlQuery(createRawTableSql, null, function(rows, fields) {});
    mysqlQuery(createMessageTableSql, null, function(rows, fields) {});
    mysqlQuery(createIeeeMgmtTableSql, null, function(rows, fields) {});

    var start = 1;
    var last = 4;

    var fileArray = [];

    for (var i = start; i <= last; ++i) {
        fileArray.push(fileBase + i + '.log');
    }

    async.eachSeries(fileArray, function(file, callback) {
        parseFile(file, callback);
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            if (messages.length) {
                mysqlQuery(batchInsertColSql, [messages], function(rows, fields) {});
            }
            if (raws.length) {
                mysqlQuery(batchInsertRawSql, [raws], function(rows, fields) {});
            }
            if (ieee80211mgmts.length) {
                mysqlQuery(batchInsertIeeeSql, [ieee80211mgmts], function(rows, fields) {});
            }
        }
        connection.end();
    });
};

main();
