'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/apnetwork', function(req, res) {
    var options = {
        host: '172.16.94.163',
        user: 'monitor',
        password: 'pass',
        database: 'monitor'
    };
    var connection = mysql.createConnection(options);

    connection.connect();

    connection.query('SELECT DISTINCT(apnetwork) FROM message;', function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            let json = [];
            rows.forEach(row =>
                json.push({
                    label: row.apnetwork,
                    value: row.apnetwork
                })
            );
            res.json(json);
        }
    });

    connection.end();
});

router.get('/ap', function(req, res) {
    var options = {
        host: '172.16.94.163',
        user: 'monitor',
        password: 'pass',
        database: 'monitor'
    };

    var connection = mysql.createConnection(options);

    connection.connect();

    let sql;
    if (req.query && req.query.apnetwork) {
        sql = 'SELECT DISTINCT(ap) FROM message WHERE apnetwork="' + req.query.apnetwork + '";';
    } else {
        sql = 'SELECT DISTINCT(ap) FROM message;';
    }

    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            let json = [];
            rows.forEach(row =>
                json.push({
                    label: row.ap,
                    value: row.ap
                })
            );
            res.json(json);
        }
    });

    connection.end();
});

// | ECHO_REQ            |
// | WTP_EVENT_REQ       |
// | STA_CFG_RESP        |
// | CFG_UPDATE_RESP     |
// | JOIN_REQ            |
// | CFG_STATUS          |
// | CHG_STATE_EVENT_REQ |
// | IMAGE_DATA_REQ      |
// | IMAGE_DATA_RESP     |
// | RESET_RESP          |

router.get('/messageType', function(req, res) {
    res.json([{
        label: 'Echo Request',
        value: 'ECHO_REQ'
    }, {
        label: 'Wtp Event Request',
        value: 'WTP_EVENT_REQ'
    }, {
        label: 'Station Configuration Response',
        value: 'STA_CFG_RESP'
    }, {
        label: 'Configuration Update Response',
        value: 'CFG_UPDATE_RESP'
    }, {
        label: 'Join Request',
        value: 'JOIN_REQ'
    }, {
        label: 'Configuration Status',
        value: 'CFG_STATUS'
    }, {
        label: 'Change State Event Request',
        value: 'CHG_STATE_EVENT_REQ'
    }, {
        label: 'Image Data Request',
        value: 'IMAGE_DATA_REQ'
    }, {
        label: 'Image Data Response',
        value: 'IMAGE_DATA_RESP'
    }, {
        label: 'Reset Response',
        value: 'RESET_RESP'
    }]);
});

module.exports = router;
