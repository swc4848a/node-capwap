'use strict';

const express = require('express');
const router = express.Router();
const net = require('net');

const mock = {
    result: [{
        data: [{}]
    }]
}

router.get('/', function(req, res) {
    if (process.argv[2] === 'home') {
        return res.json(mock);
    }
    const client = net.createConnection({ host: '172.16.95.46', port: 9688 }, () => {
        console.log('connected to server!');
        const msg = '{"id":1,"url":"\/wlan\/vap\/","method":"get","apNetworkOid":793}';
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
            res.json({
                ssids: json.result[0].data
            });
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