'use strict';

const express = require('express');
const router = express.Router();
const net = require('net');

const mock = {
    result: [{
        data: [{
            name: 'FP320C3X14012026',
            serial: 'FP320C3X14012026'
        }]
    }]
}

router.get('/', function(req, res) {
    if (process.argv[2] === 'home') {
        return res.json(mock);
    }
    const client = net.createConnection({ host: '172.16.95.46', port: 9688 }, () => {
        console.log('connected to server!');
        const msg = '{"id":30622,"url":"\/wlan\/wtp\/","method":"get","apNetworkOid":752,"params":[{"oid":4101,"name":"FP320C3X14012026"},{"oid":4105,"name":"PS323C3U15000018"},{"oid":4262,"name":"PS311C3U15000007"},{"oid":4311,"name":"FP423E3X16000330"}]}';
        client.write(msg);
        console.log('sent:', msg);
    });
    let buf = [];
    let count = 0;
    client.on('data', (data) => {
        count++;
        buf.push(data);
        try {
            let json = JSON.parse(Buffer.concat(buf).toString());
            res.json(json);
            console.log('receive done:', json);
            client.end();
        } catch (e) {
            console.log('receiving pkt', count);
        }
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
});

module.exports = router;