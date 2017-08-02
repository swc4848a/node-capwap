'use strict';

let fs = require('fs');
let express = require('express');
let path = require('path');
let app = express();
let https = require('https');
let privateKey = fs.readFileSync('cert/key.pem', 'utf8');
let certificate = fs.readFileSync('cert/cert.pem', 'utf8');

let credentials = {
    key: privateKey,
    cert: certificate
};

let cli = require('./cli');
app.use('/Cli', cli);

app.use(express.static(path.join(__dirname, './')));

let httpsServer = https.createServer(credentials, app);
let port = 8443;

httpsServer.listen(port, () => {
    console.log('https listen %d', port);
});