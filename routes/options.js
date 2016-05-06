'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/apnetwork', function(req, res) {
    var options = {
        host: '192.168.223.188',
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
        host: '192.168.223.188',
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

// {3398913, "802.11 WLAN Config REQ"},
// {3398914, "802.11 WLAN Config RESP"}, 

// CAPWAP Data Message Type (only for udp log msg)
// #define CW_DATA_MSG_TYPE_BASE                0xFFFF                                                      65535
// #define CW_DATA_MSG_TYPE_KEEPALIVE_REQ       (CW_DATA_MSG_TYPE_BASE + 0)                                 65535
// #define CW_DATA_MSG_TYPE_KEEPALIVE_RESP      (CW_DATA_MSG_TYPE_BASE + 1)                                 65536

// #define CW_DATA_MSG_TYPE_80211_BASE          (CW_DATA_MSG_TYPE_BASE + 3)                                 65538
// #define CW_DATA_MSG_TYPE_80211_ASSOC_REQ     (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_ASSOC_REQ)     65538 
// #define CW_DATA_MSG_TYPE_80211_ASSOC_RESP    (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_ASSOC_RESP)    65539
// #define CW_DATA_MSG_TYPE_80211_REASSOC_REQ   (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_REASSOC_REQ)   65540
// #define CW_DATA_MSG_TYPE_80211_REASSOC_RESP  (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_REASSOC_RESP)  65541
// #define CW_DATA_MSG_TYPE_80211_PROBE_REQ     (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_PROBE_REQ)     65542
// #define CW_DATA_MSG_TYPE_80211_PROBE_RESP    (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_PROBE_RESP)    65543
// #define CW_DATA_MSG_TYPE_80211_BEACON        (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_BEACON)        65546
// #define CW_DATA_MSG_TYPE_80211_ATIM          (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_ATIM)          65547
// #define CW_DATA_MSG_TYPE_80211_DISASSOC      (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_DISASSOC)      65548
// #define CW_DATA_MSG_TYPE_80211_AUTH          (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_AUTH)          65549
// #define CW_DATA_MSG_TYPE_80211_DEAUTH        (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_DEAUTH)        65550
// #define CW_DATA_MSG_TYPE_80211_ACTION        (CW_DATA_MSG_TYPE_80211_BASE + WLAN_FC_STYPE_ACTION)        65551


/* management */
// #define WLAN_FC_STYPE_ASSOC_REQ     0
// #define WLAN_FC_STYPE_ASSOC_RESP    1
// #define WLAN_FC_STYPE_REASSOC_REQ   2
// #define WLAN_FC_STYPE_REASSOC_RESP  3
// #define WLAN_FC_STYPE_PROBE_REQ     4
// #define WLAN_FC_STYPE_PROBE_RESP    5
// #define WLAN_FC_STYPE_BEACON        8
// #define WLAN_FC_STYPE_ATIM          9
// #define WLAN_FC_STYPE_DISASSOC      10
// #define WLAN_FC_STYPE_AUTH          11
// #define WLAN_FC_STYPE_DEAUTH        12
// #define WLAN_FC_STYPE_ACTION        13

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
        label: 'Keep Alive Request',
        value: 65535
    }, {
        label: 'Keep Alive Response',
        value: 65536
    }, {
        label: 'Association Request',
        value: 65538
    }, {
        label: 'Association Response',
        value: 65539
    }, {
        label: 'Reassociation Request',
        value: 65540
    }, {
        label: 'Reassociation Response',
        value: 65541
    }, {
        label: 'Probe Request',
        value: 65542
    }, {
        label: 'Probe Response',
        value: 65543
    }, {
        label: 'Beacon',
        value: 65546
    }, {
        label: 'Atim',
        value: 65547
    }, {
        label: 'Disassociate',
        value: 65548
    }, {
        label: 'Auth',
        value: 65549
    }, {
        label: 'Deauth',
        value: 65550
    }, {
        label: 'Action',
        value: 65551
    }, {
        label: 'WLAN Configuration Request',
        value: 3398913
    }, {
        label: 'WLAN Configuration Response',
        value: 3398914
    }]);
});

router.get('/stamac', function(req, res) {
    var options = {
        host: '192.168.223.188',
        user: 'monitor',
        password: 'pass',
        database: 'monitor'
    };

    var connection = mysql.createConnection(options);

    connection.connect();

    let sql;
    if (req.query && req.query.apnetwork && req.query.ap) {
        sql = 'SELECT DISTINCT(sta_mac) FROM message WHERE apnetwork_oid="' + req.query.apnetwork + '" AND ap="' + req.query.ap + '";';
    } else {
        sql = 'SELECT DISTINCT(sta_mac) FROM message;';
    }

    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('connection [%s] db [%s]: %s', options.host, options.database, err.message);
            res.json([]);
        } else {
            let json = [];
            rows.forEach(row =>
                json.push({
                    label: row.sta_mac,
                    value: row.sta_mac
                })
            );
            res.json(json);
        }
    });

    connection.end();
});

module.exports = router;
