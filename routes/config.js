'use strict';

var express = require('express');
var router = express.Router();
var dgram = require('dgram');

function setIpPort(req) {
    let client = dgram.createSocket('udp4');
    let message = new Buffer(JSON.stringify({
        id: 1,
        url: '/debug/udpLog/config/',
        method: 'put',
        type: 'log_server_config',
        ip: '172.16.94.161',
        port: 6060,
        apNetworkOid: 651
    }));

    client.send(message, 0, message.length, 9688, req.query.ip, (err) => {
        if (err) {
            console.error(err);
        } else {

        }
        client.close();
    });
}

function setSwitch(req, res) {
    let client = dgram.createSocket('udp4');
    let message = new Buffer(JSON.stringify({
        id: 1,
        url: '/debug/udpLog/config/',
        method: 'put',
        type: 'log_swtich',
        swtich: Number(req.query.status),
        apNetworkOid: 651
    }));

    client.send(message, 0, message.length, 9688, req.query.ip, (err) => {
        if (err) {
            console.error(err);
            res.json(err);
        } else {
            res.json({
                result: 'success'
            });
        }
        client.close();
    });
}

router.get('/apserver', function(req, res) {
    setIpPort(req);
    setSwitch(req, res);
});

module.exports = router;
