'use strict';
const fs = require('fs');
var express = require('express');
var router = express.Router();

var diagramArray = [];

function parseLine(log) {
    var parts;
    var timestamp;
    var level;
    var thread;
    var file;
    var line;
    var message;

    if (parts = log.match(/\((\d{5})\)\[(.*?)\s-\s(.*?)\] \[thread:(\d)\] \[(.*):(\d+)\] (.*)/)) {
        timestamp = parts[2];
        level = parts[3];
        thread = parts[4];
        file = parts[5];
        line = parts[6];
        message = parts[7];
    } else if (parts = log.match(/\((\d{5})\)\[(.*?)\s-\s(.*?)\] \[thread:(\d)\](.*)/)) {
        timestamp = parts[2];
        level = parts[3];
        thread = parts[4];
        message = parts[5];
    } else if (parts = log.match(/\((\d{5})\)\[(.*?)\s-\s(.*?)\] (.*)/)) {
        timestamp = parts[2];
        level = parts[3];
        message = parts[4];
    } else {
        // console.log('Cannot MATCH => ' + log);
        return;
    }

    var item = {
        timestamp: timestamp,
        level: level,
        thread: thread,
        file: file,
        line: line,
        message: message
    };
    console.log(item);
    diagramArray.push(item);
}

function parseLog(callback) {
    var file = 'D:\\Workspaces\\Project\\log\\fapsim\\capwap.log';

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        var lines = data.match(/[^\r\n]+/g);

        lines.forEach(function(line, index) {
            parseLine(line);
        });

        callback();
    });
}

router.get('/', function(req, res) {
    diagramArray = [];
    parseLog(function() {
        res.json(diagramArray);
    });
});

module.exports = router;
