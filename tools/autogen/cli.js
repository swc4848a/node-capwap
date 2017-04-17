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

let isTable = (stdout) => {
    return S(stdout).contains('== [');
}

let objectParse = (stdout, query) => {
    let parts = stdout.match(/([a-z,-]+)\s+:\s(.*)/g);
    let result = {};
    parts.forEach((item) => {
        let line = S(item).parseCSV(':');
        result[S(line[0]).trim().s] = line[1] ? S(line[1]).trim().s : undefined;
    })
    console.log(result);
    console.log(query);
    _.each(query, (v, k) => {
        if (result[k]) {
            if (result[k] === v) {
                console.log('set %s %s success', k, v)
            } else {
                console.error('set %s %s failed', k, v)
            }
        } else {
            console.error("error: can't find %s in result", k);
        }
    })
}

let getLastId = (stdout) => {
    let parts = stdout.match(/\[\s(\d)\s\]/g);
    return S(_.last(parts)).between('[ ', ' ]');
}

let tableParse = (cli, stdout, query) => {
    let cmd = 'config ' + cli + '\nedit ' + getLastId(stdout) + '\nget\n'
    exec(cmd, 'admin@172.16.95.49', function(err, newout, stderr) {
        if (err) console.error(err);
        if (newout) parse(undefined, newout, query);
        if (stderr) console.error(stderr);
    })
}

let parse = (cli, stdout, query) => {
    if (isTable(stdout)) {
        tableParse(cli, stdout, query)
    } else {
        objectParse(stdout, query)
    }
}

let api = [
    ['/Admin%20Settings', 'system global'],
    ['/Routing', 'router static'],
];

let worker = (req, res, cli) => {
    console.log('cli request received: ' + JSON.stringify(req.query));

    let cmd = 'config ' + cli + '\nget\n';

    exec(cmd, 'admin@172.16.95.49', function(err, stdout, stderr) {
        if (err) console.error(err);
        if (stdout) parse(cli, stdout, req.query);
        if (stderr) console.error(stderr);
    })

    res.json({
        result: 'success'
    })
}

let factory = () => {
    api.forEach((item) => {
        router.get(item[0], (req, res) => {
            worker(req, res, item[1]);
        });
    })
}

factory();

module.exports = router;
