'use strict';

const express = require('express');
const router = express.Router();
const net = require('net');

router.post('/', function(req, res) {
    return res.json({
        result: 'success'
    })
});

module.exports = router;