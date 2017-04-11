'use strict';

const net = require('net');
const api = require('./api');

const server = net.createServer((c) => {
    // console.log('client connected');

    c.on('data', (data) => {
        let req = JSON.parse(data.toString());
        let res = api.json(req);
        c.write(JSON.stringify(res));
        console.log(res);
        c.pipe(c);
    });

    c.on('end', () => {
        // console.log('client disconnected');
    });
});

server.on('error', (err) => {
    throw err;
});

server.listen(6020, () => {
    console.log('server bound');
});

const tunnel = net.createServer((c) => {
    c.on('data', (data) => {
        console.log('tunnel received: ' + data);
    });

    c.on('end', () => {
        console.log('fortigate disconnected');
    });
});

tunnel.on('error', (err) => {
    throw err;
});

tunnel.listen(541, () => {
    console.log('tunnel bound');
});