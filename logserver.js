'use strict';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
// var debug = require('debug')('node-capwap::logserver');

// udp log server 
server.on('listening', function() {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function(message, remote) {
    var json = JSON.stringify(message.toString('ascii'));

    console.log(json);
});

server.on("error", function(err) {
    console.trace("Server Error:\n" + err.stack);
    server.close();
});

server.on("close", function(err) {
    console.log("Server close");
});

server.bind(6000, '172.16.94.161');
