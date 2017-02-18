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
    db.query('my_index/new-view', {
        key: 'FAP21D3U15000075',
        include_docs: true
    }).then(function(result) {
        let json = _.countBy(result, (item) => {
            return item.doc.ts;
        });
        console.log(json);
        res.json(json);
    }).catch(function(err) {
        console.error(err);
        res.json(err);
    });
})

module.exports = router;
