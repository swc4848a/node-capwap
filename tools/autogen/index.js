'use strict';

var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var https = require('https');
var privateKey = fs.readFileSync('ryans-key.pem', 'utf8');
var certificate = fs.readFileSync('ryans-cert.pem', 'utf8');
var credentials = {
    key: privateKey,
    cert: certificate
};

app.use(express.static(path.join(__dirname, './')));

app.set('port', process.env.PORT || 5000);

var httpsServer = https.createServer(credentials, app);

var server = app.listen(app.get('port'), function() {
    console.log('publish gui.js listening on port ' + server.address().port);
});