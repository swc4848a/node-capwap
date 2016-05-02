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
        value: 'DISCOVERY_REQ'
    }, {
        label: 'Discover Response',
        value: 'DISCOVERY_RESP'
    }, {
        label: 'Join Request',
        value: 'JOIN_REQ'
    }, {
        label: 'Join Response',
        value: 'JOIN_RESP'
    }, {
        label: 'Configuration Status Request',
        value: 'CFG_STATUS'
    }, {
        label: 'Configuration Status Response',
        value: 'CFG_STATUS_RESP'
    }, {
        label: 'Configuration Update Request',
        value: 'CFG_UPDATE_REQ'
    }, {
        label: 'Configuration Update Response',
        value: 'CFG_UPDATE_RESP'
    }, {
        label: 'Wtp Event Request',
        value: 'WTP_EVENT_REQ'
    }, {
        label: 'Wtp Event Response',
        value: 'WTP_EVENT_RESP'
    }, {
        label: 'Change State Request',
        value: 'CHG_STATE_EVENT_REQ'
    }, {
        label: 'Change State Response',
        value: 'CHG_STATE_EVENT_RESP'
    }, {
        label: 'Echo Request',
        value: 'ECHO_REQ'
    }, {
        label: 'Echo Response',
        value: 'ECHO_RESP'
    }, {
        label: 'Image Data Request',
        value: 'IMAGE_DATA_REQ'
    }, {
        label: 'Image Data Response',
        value: 'IMAGE_DATA_RESP'
    }, {
        label: 'Reset Request',
        value: 'RESET_REQ'
    }, {
        label: 'Reset Response',
        value: 'RESET_RESP'
    }, {
        label: 'Primary Discovery Request',
        value: 'PRIM_DISCOVERY_REQ'
    }, {
        label: 'Primary Discovery Response',
        value: 'PRIM_DISCOVERY_RESP'
    }, {
        label: 'Data Transfer Request',
        value: 'DATA_TRANSFER_REQ'
    }, {
        label: 'Data Transfer Response',
        value: 'DATA_TRANSFER_RESP'
    }, {
        label: 'Clear Configuration Request',
        value: 'CLR_CFG_REQ'
    }, {
        label: 'Clear Configuration Response',
        value: 'CLR_CFG_RESP'
    }, {
        label: 'Configuration Status Request',
        value: 'STA_CFG_REQ'
    }, {
        label: 'Configuration Status Response',
        value: 'STA_CFG_RESP'
    }, {
        label: 'Keep-Alive',
        value: 'DATA_CHAN_KEEP_ALIVE'
    }, {
        label: 'IEEE 802.11 WLAN Configuration Request',
        value: '802.11 WLAN Config REQ'
    }, {
        label: 'IEEE 802.11 WLAN Configuration Response',
        value: '802.11 WLAN Config RESP'
    }]);
});

module.exports = router;
