let cases = require('./root.js');

cases['admin settings common'] = [
    ["div.gwt-HTML:contains('Admin Settings')", undefined, "a[ng-href='admin/settings']"],
    ["input.gwt-TextBox:eq(0)", 80, "input#admin-port"],
    ["input:checkbox", true, "input#redirect-check"],
    ["input.gwt-TextBox:eq(1)", 443, "input#admin-sport"],
    ["input.gwt-TextBox:eq(2)", 23, "input#admin-telnet-port"],
    ["input.gwt-TextBox:eq(3)", 22, "input#admin-ssh-port"],
    ["input.gwt-TextBox:eq(4)", 480, "input#admintimeout"],
    ["span:contains('Save')", undefined, "skip"],
];

module.exports = cases;
