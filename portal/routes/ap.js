'use strict';

const express = require('express');
const router = express.Router();
const net = require('net');

const mock = {
    result: [{
        data: [{
            name: 'FP320C3X14012026',
            serial: 'FP320C3X14012026',
            tags: [{ name: 'tag-one', label: 'tag-one', value: true }, { name: 'tag-two', label: 'tag-two', value: false }],
            access: [
                { name: 'telnet', label: 'Telnet', value: true },
                { name: 'http', label: 'HTTP', value: true },
                { name: 'https', label: 'HTTPS', value: true },
                { name: 'ssh', label: 'SSH', value: true }
            ]
        }]
    }]
}

router.get('/', function(req, res) {
    if (process.argv[2] === 'home') {
        return res.json(mock);
    }
    const client = net.createConnection({ host: '172.16.95.46', port: 9688 }, () => {
        console.log('connected to server!');
        const msg = '{"id":30622,"url":"\/wlan\/wtp\/","method":"get","apNetworkOid":793}';
        client.write(msg);
        client.end();
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
        } catch (e) {
            console.log('receiving pkt', count);
        }
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
});

module.exports = router;