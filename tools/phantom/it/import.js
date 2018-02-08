let importConfig = [
    ["button:contains('Import')"],
    ["div.popupContent button:contains('YES')"],
    [undefined, {action: "sleep", value: 10000}]
    // ["div.popupContent button:contains('OK')"],
]

module.exports = importConfig;
