'use strict';

var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
var S = require('string');

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

module.exports = router;
