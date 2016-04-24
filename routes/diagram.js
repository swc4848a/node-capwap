'use strict';
const fs = require('fs');
var express = require('express');
var router = express.Router();

var diagramArray = [];

// [
//     '(19009)[2016-04-14 13:39:47 - DEBUG] [thread:3] [cwAcProto.c:883] cwAcProcPlainCtlMsg: <msg> JOIN_REQ (2) <== ws (662-FP320CZQQ1000001-172.16.95.182:10002)',
//     '19009',
//     '2016-04-14 13:39:47',
//     'DEBUG',
//     '3',
//     'cwAcProto.c',
//     '883',
//     'cwAcProcPlainCtlMsg',
//     'JOIN_REQ',
//     '<== ws',
//     '662',
//     'FP320CZQQ1000001',
//     '172.16.95.182',
//     '10002',
//     index: 0,
//     input: '(19009)[2016-04-14 13:39:47 - DEBUG] [thread:3] [cwAcProto.c:883] cwAcProcPlainCtlMsg: <msg> JOIN_REQ (2) <== ws (662-FP320CZQQ1000001-172.16.95.182:10002)'
// ]

function parseLine(line) {
    var parts = line.match(/\((\d{5})\)\[(.*?)\s-\s(.*?)\] \[\w+:(\d)\] \[(\w+.\w+):(\d+)\] (\w+): \<\w+\> (\w+) \(\d+\) (<== ws|==> ws) \((\d+)-(\w+)-([\d.]+):(\d+)\)/);

    if (parts) {
        var message = {
            label: parts[8],
            direction: parts[9]
        };
        diagramArray.push(message);
    }
}

function parseLog(callback) {
    var file = 'D:\\Workspaces\\Project\\log\\fapsim\\capwap.log';

    fs.readFile(file, 'utf8', (err, data) => {
        if (!err) {
            var lines = data.match(/[^\r\n]+/g);

            lines.forEach(function(line, index) {
                parseLine(line);
            });
        }

        callback(err);
    });
}

router.get('/', function(req, res) {
    diagramArray = [];
    parseLog(function(err) {
        if (err) {
            console.log(err.message);
            res.json([]);
        } else {
            res.json(diagramArray);
        }
    });
});

module.exports = router;
