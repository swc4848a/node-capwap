'use strict';

var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
var S = require('string');
var PouchDB = require('pouchdb');
var db = new PouchDB('http://172.16.95.48:5984/logs');
var moment = require('moment');
var _ = require('underscore');

router.get('/commands', function(req, res) {
    let cmd = req.query.commands

    if (S(cmd).startsWith('grep')) {
        exec(req.query.commands, (error, stdout, stderr) => {
            if (error) {
                res.json({
                    result: `exec error: ${error}`
                });
            } else {
                res.json({
                    result: `stdout: ${stdout}`
                });
            }
        });
    } else {
        res.json({
            result: 'Not support commands, now only support grep!'
        })
    }
});

router.get('/data', function(req, res) {
    let now = moment();
    let start = parseInt(now.valueOf() / 1000, 10);
    let end = parseInt(now.valueOf() / 1000, 10);

    switch (req.query.time) {
        case '24':
            start = end - 24 * 3600;
            break;
        case '7':
            start = end - 7 * 24 * 3600;
            break;
        case '31':
            start = end - 31 * 24 * 3600;
            break;
        case 'specify':
            console.log('not support!');
            start = end - 100 * 24 * 3600;
            break;
        default:
            console.log('req.query.time: ', req.query.time);
            return res.json({
                error: 'req.query.time [' + req.query.time + '] not in [24, 7, 31]'
            });
    }

    console.log('start: %d, end: %d', start, end);

    db.query('my_index/new-view', {
        startkey: [start, 'FP223C3X16001602'],
        endkey: [end, 'FP223C3X16001602'],
        include_docs: true
    }).then(function(result) {
        let json = _.countBy(result.rows, (item) => {
            return Date(item.value.ts);
        });
        console.log(json);
        res.json(json);
    }).catch(function(err) {
        console.error(err);
        res.json(err);
    });
})

module.exports = router;
