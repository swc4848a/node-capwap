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

    connection.query('SELECT DISTINCT(apnetwork_oid) FROM message;', function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            let json = [];
            rows.forEach(row =>
                json.push({
                    label: row.apnetwork_oid,
                    value: row.apnetwork_oid
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
        sql = 'SELECT DISTINCT(ap_sn) FROM message WHERE apnetwork_oid="' + req.query.apnetwork + '";';
    } else {
        sql = 'SELECT DISTINCT(ap_sn) FROM message;';
    }

    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            let json = [];
            rows.forEach(row =>
                json.push({
                    label: row.ap_sn,
                    value: row.ap_sn
                })
            );
            res.json(json);
        }
    });

    connection.end();
});

// CAPWAP Control Message           Message Type
//                                   Value
// Discovery Request                    1 
// Discovery Response                   2 
// Join Request                         3 
// Join Response                        4 
// Configuration Status Request         5 
// Configuration Status Response        6 
// Configuration Update Request         7 
// Configuration Update Response        8 
// WTP Event Request                    9 
// WTP Event Response                  10 
// Change State Event Request          11 
// Change State Event Response         12 
// Echo Request                        13 
// Echo Response                       14 
// Image Data Request                  15 
// Image Data Response                 16 
// Reset Request                       17 
// Reset Response                      18 
// Primary Discovery Request           19 
// Primary Discovery Response          20 
// Data Transfer Request               21 
// Data Transfer Response              22 
// Clear Configuration Request         23 
// Clear Configuration Response        24 
// Station Configuration Request       25 
// Station Configuration Response      26 

// {1, "DISCOVERY_REQ"},   
// {2, "DISCOVERY_RESP"},  
// {3, "JOIN_REQ"},    
// {4, "JOIN_RESP"},   
// {5, "CFG_STATUS"},  
// {6, "CFG_STATUS_RESP"}, 
// {7, "CFG_UPDATE_REQ"},  
// {8, "CFG_UPDATE_RESP"}, 
// {9, "WTP_EVENT_REQ"},   
// {10, "WTP_EVENT_RESP"}, 
// {11, "CHG_STATE_EVENT_REQ"},    
// {12, "CHG_STATE_EVENT_RESP"},   
// {13, "ECHO_REQ"},   
// {14, "ECHO_RESP"},  
// {15, "IMAGE_DATA_REQ"}, 
// {16, "IMAGE_DATA_RESP"},    
// {17, "RESET_REQ"},  
// {18, "RESET_RESP"}, 
// {19, "PRIM_DISCOVERY_REQ"}, 
// {20, "PRIM_DISCOVERY_RESP"},    
// {21, "DATA_TRANSFER_REQ"},  
// {22, "DATA_TRANSFER_RESP"}, 
// {23, "CLR_CFG_REQ"},    
// {24, "CLR_CFG_RESP"},   
// {25, "STA_CFG_REQ"},    
// {26, "STA_CFG_RESP"},

// {1, "802.11 WLAN Config REQ"},
// {2, "802.11 WLAN Config RESP"}, 

router.get('/messageType', function(req, res) {
    res.json([{
        label: 'Discover Request',
        value: 1
    }, {
        label: 'Discover Response',
        value: 2
    }, {
        label: 'Join Request',
        value: 3
    }, {
        label: 'Join Response',
        value: 4
    }, {
        label: 'Configuration Status Request',
        value: 5
    }, {
        label: 'Configuration Status Response',
        value: 6
    }, {
        label: 'Configuration Update Request',
        value: 7
    }, {
        label: 'Configuration Update Response',
        value: 8
    }, {
        label: 'Wtp Event Request',
        value: 9
    }, {
        label: 'Wtp Event Response',
        value: 10
    }, {
        label: 'Change State Request',
        value: 11
    }, {
        label: 'Change State Response',
        value: 12
    }, {
        label: 'Echo Request',
        value: 13
    }, {
        label: 'Echo Response',
        value: 14
    }, {
        label: 'Image Data Request',
        value: 15
    }, {
        label: 'Image Data Response',
        value: 16
    }, {
        label: 'Reset Request',
        value: 17
    }, {
        label: 'Reset Response',
        value: 18
    }, {
        label: 'Primary Discovery Request',
        value: 19
    }, {
        label: 'Primary Discovery Response',
        value: 20
    }, {
        label: 'Data Transfer Request',
        value: 21
    }, {
        label: 'Data Transfer Response',
        value: 22
    }, {
        label: 'Clear Configuration Request',
        value: 23
    }, {
        label: 'Clear Configuration Response',
        value: 24
    }, {
        label: 'Configuration Status Request',
        value: 25
    }, {
        label: 'Configuration Status Response',
        value: 26
    }, {
        label: 'Keep Alive',
        value: 27
    }, {
        label: 'IEEE 802.11 WLAN Configuration Request',
        value: 28
    }, {
        label: 'IEEE 802.11 WLAN Configuration Response',
        value: 29
    }]);
});

module.exports = router;
