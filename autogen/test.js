const net = require('net');

const client = net.createConnection({
    port: 6030,
    host: '172.16.94.163'
}, () => {
    //'connect' listener
    console.log('connected to server!');
    client.write('{"action":"onetimeGet","sn":"FGT60D4615007833"}\r\n');
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});

client.on('end', () => {
    console.log('disconnected from server');
});
