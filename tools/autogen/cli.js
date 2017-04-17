'use strict';

var express = require('express');
var router = express.Router();
let exec = require('ssh-exec');
let S = require('string');
let _ = require('lodash');

let cli_parse = (stdout, query) => {
    let cli = S(stdout).between('config system global', 'end').s;
    let set = S(cli).trim().s;
    let config = S(set).parseCSV('\n');

    let result = {};
    config.forEach((item) => {
        let line = S(item).parseCSV(' ');
        result[line[1]] = (line.length === 3) ? line[2] : _.slice(line, 2);
    })
    console.log(result);
    console.log(query);
    _.each(query, (v, k) => {
        if (result[k]) {
            if (result[k] === v) {
                console.log('success')
            } else {
                console.error('failed')
            }
        } else {
            console.error("can't find %s in result", k);
        }
    })
}

let kv_parse = (stdout, query) => {
    let kv = S(stdout).between(') #', 'FGT60D4615007833').s;
    let set = S(kv).trim().s;
    let config = S(set).parseCSV('\n');

    let result = {};
    config.forEach((item) => {
        let line = S(item).parseCSV(':');
        result[S(line[0]).trim().s] = S(line[1]).trim().s;
    })
    _.each(query, (v, k) => {
        if (result[k]) {
            if (result[k] === v) {
                console.log('set %s %s success', k, v)
            } else {
                console.error('set %s %s failed', k, v)
            }
        } else {
            console.error("can't find %s in result", k);
        }
    })
}

router.get('/Admin%20Settings', function(req, res) {
    console.log('cli request received: ' + JSON.stringify(req.query));

    let cmd = 'config system global\nget\n';

    exec(cmd, 'admin@172.16.95.49', function(err, stdout, stderr) {
        if (err) console.error(err);
        if (stdout) kv_parse(stdout, req.query);
        if (stderr) console.error(stderr);
    })

    res.json({
        result: 'success'
    })
});

module.exports = router;
