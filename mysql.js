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
var collections = [];

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
        /\(.*?\)\[(.*?)\s-\s+(.*?)\] \[thread:(\d+)\]\s+\[0;\d+m(.*)/,
        // for raw log
        /\(.*?\)\[(.*?)\s-\s+(.*?)\] \[thread:(\d+)\]\s+(.*)/,
    ];

    var rules = [
        // for capwap message
        /\(.*?\)\[(.*?)\s-\s.*?\] \[.*?\] .*?: <msg> (\w+) \(\d+\) (<==|==>)\s+ws \((\d+)-(\w+)-(\d.+):(\d+)\)/,
        /\(.*?\)\[(.*?)\s-\s.*?\] \[.*?\] .*? ws \(\d+-\d.+:\d+\)\s+<msg>\s+(\w+)\s+(==>|<==)\s+ws\s+\((\d+)-(\w+)-(\d.+):(\d+)\)/,
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
            collections.push([parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7]]);
            break;
        }
    }
};

var batchInsertRawSql = 'INSERT INTO raw (time, level, thread, log) VALUES ?';
var batchInsertColSql = 'INSERT INTO message (time, messageType, direction, apnetwork, ap, ip, port) VALUES ?';

var bar;

function parseFile(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (!err) {
            var lines = data.match(/[^\r\n]+/g);

            bar = new ProgressBar('  processing [:bar] :current :total :elapsed :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 100,
                total: lines.length
            });

            lines.forEach(function(line, index) {
                parseLine(line);
                if (0 === index % 1000) {
                    if (collections.length) {
                        mysqlQuery(batchInsertColSql, [collections], function(rows, fields) {});
                        collections = [];
                    }
                    if (raws.length) {
                        mysqlQuery(batchInsertRawSql, [raws], function(rows, fields) {
                            bar.tick(1000);
                        });
                        raws = [];
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

    var start = 1;
    var last = 1;

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
            if (collections.length) {
                mysqlQuery(batchInsertColSql, [collections], function(rows, fields) {});
            }
            if (raws.length) {
                mysqlQuery(batchInsertRawSql, [raws], function(rows, fields) {});
            }
        }
        connection.end();
    });
};

main();
