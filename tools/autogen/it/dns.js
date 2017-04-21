let cases = require('./root.js');

// todo: gate gui bug
cases['dns edit use fortigurad'] = [
    ["div.gwt-HTML:contains('DNS'):eq(0)", undefined, "a[ng-href='page/p/system/dns/']"],
    ["input[type='radio']:eq(0)", undefined, "input#type_fortiguard", true],
    ["input.gwt-TextBox:eq(2)", "test string", "input#domain"],
    ["span:contains('Save')", undefined, "skip"],
];

// todo: 
cases['dns edit specify'] = [
    ["div.gwt-HTML:contains('DNS'):eq(0)"],
    ["input[type='radio']:eq(1)"],
    ["input.gwt-TextBox:eq(0)", "1.1.1.1"],
    ["input.gwt-TextBox:eq(1)", "2.2.2.2"],
    ["input.gwt-TextBox:eq(2)", "test string"],
    ["span:contains('Save')"],
]

delete cases['dns edit use fortigurad'];
delete cases['dns edit specify'];

module.exports = cases;
