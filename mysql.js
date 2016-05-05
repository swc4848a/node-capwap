'use strict';

var fs = require('fs');
var async = require('async');
var ProgressBar = require('progress');
var dgram = require('dgram');
const moment = require('moment');
const EventEmitter = require('events');

var raws = [];
var messages = [];
var ieee80211mgmts = [];

function stringToType(message) {
    switch (message) {
        case 'DISCOVERY_REQ':
            return 1;
        case 'DISCOVERY_RESP':
            return 2;
        case 'JOIN_REQ':
            return 3;
        case 'JOIN_RESP':
            return 4;
        case 'CFG_STATUS':
            return 5;
        case 'CFG_STATUS_RESP':
            return 6;
        case 'CFG_UPDATE_REQ':
            return 7;
        case 'CFG_UPDATE_RESP':
            return 8;
        case 'WTP_EVENT_REQ':
            return 9;
        case 'WTP_EVENT_RESP':
            return 10;
        case 'CHG_STATE_EVENT_REQ':
            return 11;
        case 'CHG_STATE_EVENT_RESP':
            return 12;
        case 'ECHO_REQ':
            return 13;
        case 'ECHO_RESP':
            return 14;
        case 'IMAGE_DATA_REQ':
            return 15;
        case 'IMAGE_DATA_RESP':
            return 16;
        case 'RESET_REQ':
            return 17;
        case 'RESET_RESP':
            return 18;
        case 'PRIM_DISCOVERY_REQ':
            return 19;
        case 'PRIM_DISCOVERY_RESP':
            return 20;
        case 'DATA_TRANSFER_REQ':
            return 21;
        case 'DATA_TRANSFER_RESP':
            return 22;
        case 'CLR_CFG_REQ':
            return 23;
        case 'CLR_CFG_RESP':
            return 24;
        case 'STA_CFG_REQ':
            return 25;
        case 'STA_CFG_RESP':
            return 26;
        default:
            return 0;
    }
}

class Worker extends EventEmitter {};
const logWorker = new Worker();

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
        /\(.*?\)\[(.*?)\s-\s+.*?\]\s+\[\d;\d+m\d.+\s+(.*?)\s+<ih>\s+(.*?)\s+(<==|==>)\s+.*?\s+ws\s+\((\d+)\s+-(\d.+):(\d+)\)\s+vap\s+(\w+)\srId\s(\d+)\swId\s(\d+)\s+(.*:?)/,
        /\(.*?\)\[(.*?)\s-\s+.*?\]\s+\[\d;\d+m\d.+\s+(.*?)\s+<ih>\s+(.*?)\s+(<==|==>)\s+.*?\s+ws\s+\((\d+)-(\d.+):(\d+)\)\svap\s(\w+)\srId\s(\d)\swId\s(\d)\s(.*:?)\sresp\s\d+/
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

            // messages.push([parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7]]);

            let ts = moment(parts[1], 'YYYY-MM-DD HH:mm:ss').unix();
            let msg_type = stringToType(parts[2]);
            let direction = (parts[3] === '<==') ? 0 : 1;

            let obj = {
                ts: ts,
                msg_type: msg_type,
                direction: direction,
                apnetwork_oid: parts[4],
                ap_sn: parts[5],
                sta_mac: '00:00:00:00:00:00'
            };

            messages.push(obj);

            if (messages.length === 1000) {
                logWorker.emit('send');
            }

            // var client = dgram.createSocket('udp4');
            // let message = new Buffer(JSON.stringify(obj));

            // client.send(message, 0, message.length, 6060, 'localhost', (err) => {
            //     if (err) console.error(err);
            //     console.log('udp send');
            //     client.close();
            // });

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
                bar.tick(1);
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

function main() {
    var start = 1;
    var last = 2;

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
                logWorker.emit('send');
            }
            console.log('success');
        }
    });
};

logWorker.on('send', () => {
    var client = dgram.createSocket('udp4');
    let message = new Buffer(JSON.stringify(messages.splice(0)));
    client.send(message, 0, message.length, 6060, 'localhost', (err) => {
        if (err) console.error(err);
        console.log('udp send ' + message.length);
        client.close();
    });
});

main();
