let cases = require('./root.js');

cases['deploy'] = [
    ["button[title='Deploy']"],
    ["span:contains('YES')"],
    ["button:contains('OK')"],
    ["span:contains('Close')"],
]

module.exports = cases;
