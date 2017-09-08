'use strict';

const express = require('express');
const router = express.Router();
const net = require('net');

const timezoneOptions = [
    { value: 'GMT', label: 'Greenwich Mean Time GMT' },
    { value: 'UTC', label: 'Universal Coordinated Time GMT' },
    { value: 'ECT', label: 'European Central Time GMT+1:00' },
    { value: 'EET', label: 'Eastern European Time GMT+2:00' },
    { value: 'ART', label: '(Arabic) Egypt Standard Time GMT+2:00' },
    { value: 'EAT', label: 'Eastern African Time GMT+3:00' },
    { value: 'MET', label: 'Middle East Time GMT+3:30' },
    { value: 'NET', label: 'Near East Time GMT+4:00' },
    { value: 'PLT', label: 'Pakistan Lahore Time GMT+5:00' },
    { value: 'IST', label: 'India Standard Time GMT+5:30' },
    { value: 'BST', label: 'Bangladesh Standard Time GMT+6:00' },
    { value: 'VST', label: 'Vietnam Standard Time GMT+7:00' },
    { value: 'CTT', label: 'China Taiwan Time GMT+8:00' },
    { value: 'JST', label: 'Japan Standard Time GMT+9:00' },
    { value: 'ACT', label: 'Australia Central Time GMT+9:30' },
    { value: 'AET', label: 'Australia Eastern Time GMT+10:00' },
    { value: 'SST', label: 'Solomon Standard Time GMT+11:00' },
    { value: 'NST', label: 'New Zealand Standard Time GMT+12:00' },
    { value: 'MIT', label: 'Midway Islands Time GMT-11:00' },
    { value: 'HST', label: 'Hawaii Standard Time GMT-10:00' },
    { value: 'AST', label: 'Alaska Standard Time GMT-9:00' },
    { value: 'PST', label: 'Pacific Standard Time GMT-8:00' },
    { value: 'PNT', label: 'Phoenix Standard Time GMT-7:00' },
    { value: 'MST', label: 'Mountain Standard Time GMT-7:00' },
    { value: 'CST', label: 'Central Standard Time GMT-6:00' },
    { value: 'EST', label: 'Eastern Standard Time GMT-5:00' },
    { value: 'IET', label: 'Indiana Eastern Standard Time GMT-5:00' },
    { value: 'PRT', label: 'Puerto Rico and US Virgin Islands Time GMT-4:00' },
    { value: 'CNT', label: 'Canada Newfoundland Time GMT-3:30' },
    { value: 'AGT', label: 'Argentina Standard Time GMT-3:00' },
    { value: 'BET', label: 'Brazil Eastern Time GMT-3:00' },
    { value: 'CAT', label: 'Central African Time GMT-1:00' },
]

router.get('/', function(req, res) {
    return res.json({
        options: timezoneOptions
    });
});

module.exports = router;