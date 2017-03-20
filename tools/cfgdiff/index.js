'use strict';

const net = require('net');
const api = require('./api');

const server = net.createServer((c) => {
    console.log('client connected');

    c.on('data', (data) => {
        let res = api.json(JSON.parse(data.toString()));
        c.write(JSON.stringify(res));
        console.log(res);
        c.pipe(c);
    });

    c.on('end', () => {
        console.log('client disconnected');
    });
});

server.on('error', (err) => {
    throw err;
});

server.listen(6020, () => {
    console.log('server bound');
});