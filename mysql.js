'use strict';

/*
    Setup mysql server (now: 172.16.94.163):
    1. mysql -u root
    2. grant all privileges on *.* to monitor@"172.16.94.161" identified by 'monitor';
    3. SET PASSWORD FOR 'monitor'@'172.16.94.161' = PASSWORD('pass');
    4. create database monitor;
*/

var fs = require('fs');
var mysql = require('mysql');
var async = require('async');

var connection;
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
    console.log(query.sql);
};

function parseLine(line) {
    var parts = line.match(/\(.*?\)\[(.*?)\s-\s.*?\] \[.*?\] .*?: <msg> (\w+) \(\d+\) <== ws \((\d+)-(\w+)-(\d.+):(\d+)\)/);
    if (parts) {
        // time: parts[1],
        // messageType: parts[2],
        // apnetwork: parts[3],
        // ap: parts[4],
        // ip: parts[5],
        // port: parts[6],
        collections.push([parts[1], parts[2], parts[3], parts[4], parts[5], parts[6]]);
    }
};

var batchInsertSql = 'INSERT INTO message (time, messageType, apnetwork, ap, ip, port) VALUES ?';

function parseFile(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (!err) {
            var lines = data.match(/[^\r\n]+/g);

            lines.forEach(function(line, index) {
                parseLine(line);
                if (0 === index % 10000) {
                    if (collections.length) {
                        var query = mysqlQuery(batchInsertSql, [collections], function(rows, fields) {});
                        collections = [];
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

var sql = 'CREATE TABLE IF NOT EXISTS ' +
    'message (' +
    'time TIMESTAMP, ' +
    'messageType varchar(64), ' +
    'apnetwork INT(10), ' +
    'ap varchar(64), ' +
    'ip varchar(15), ' +
    'port smallint(5)' +
    ')';

function main() {
    connection = mysql.createConnection(options);
    connection.connect();

    mysqlQuery(sql, null, function(rows, fields) {});

    var start = 1;
    var last = 20;

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
                var query = mysqlQuery(batchInsertSql, [collections], function(rows, fields) {});
            }
            console.log('batch insert success!');
        }
        connection.end();
    });
};

main();
