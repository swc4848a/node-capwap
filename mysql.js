'use strict';

/*
    Setup mysql server (now: 172.16.94.163):
    1. mysql -u root
    2. grant all privileges on *.* to monitor@"172.16.94.161" identified by 'monitor';
    3. SET PASSWORD FOR 'monitor'@'172.16.94.161' = PASSWORD('pass');
    4. create database monitor;
*/

var mysql = require('mysql');
var fs = require('fs');
var async = require('async');

var connection;

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
    var parts = line.match(/\(.*?\)\[(.*?)\s-\s.*?\] \[.*?\] .*?: <msg> JOIN_REQ \(\d+\) <== ws \((\d+)-(\w+)-(\d.+):(\d+)\)/);
    if (parts) {
        var row = {
            time: parts[1],
            apnetwork: parts[2],
            ap: parts[3],
            ip: parts[4],
            port: parts[5],
        };

        var query = mysqlQuery('INSERT IGNORE INTO message SET ?', row, function(rows, fields) {

        });
    }
};

var fileBase = 'D:\\Workspaces\\Project\\log\\monitor\\capwap.';

var sql = 'CREATE TABLE IF NOT EXISTS ' +
    'message (' +
    'time TIMESTAMP, ' +
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
    var last = 10;

    var fileArray = [];

    for (var i = start; i <= last; ++i) {
        fileArray.push(fileBase + i + '.log');
    }

    async.each(fileArray, function(file, callback) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (!err) {
                var lines = data.match(/[^\r\n]+/g);

                lines.forEach(function(line, index) {
                    parseLine(line);
                });

                callback();
            } else {
                if ('ENOENT' === err.code) {
                    callback();
                } else {
                    callback(err);
                }
            }
        });
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('success');
        }
        connection.end();
    });
};

main();
