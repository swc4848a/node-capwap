'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log('cli request received');
    res.json({
        result: 'success'
    })
});

module.exports = router;