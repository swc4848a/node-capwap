'use strict';

const express = require('express');
const router = express.Router();
const net = require('net');

router.get('/', function(req, res) {
    return res.json({
        options: [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ]
    });
});

module.exports = router;