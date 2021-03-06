#!/usr/bin/env node

'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/theme/project/img/cloud.png'));

var Stores = require('./routes/stores');
var Graph = require('./routes/graph');
var Diagram = require('./routes/diagram');
var Options = require('./routes/options');
var Config = require('./routes/config');
var Analysis = require('./routes/analysis');

// routes
app.use('/Stores', Stores);
app.use('/Graph', Graph);
app.use('/Diagram', Diagram);
app.use('/Options', Options);
app.use('/Config', Config);
app.use('/Analysis', Analysis);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
