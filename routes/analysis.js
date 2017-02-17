'use strict';

var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
var S = require('string');
var PouchDB = require('pouchdb');
var db = new PouchDB('http://172.16.95.48:5984/logs');
var moment = require('moment');

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
    db.query('my_index/new-view', {
        reduce: true,
        group: true
    }).then(function(result) {
        console.log(result);
        let json = [];
        result.rows.forEach((elem) => {
            json.push([moment.unix(elem.key), elem.value]);
        });
        res.json(json);
    }).catch(function(err) {
        console.error(err);
        res.json(err);
    });
})

module.exports = router;
