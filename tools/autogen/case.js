'use strict';

let cases = {};

// [cloud-selector, {value}, gate-selector, {skip}
cases['login (must be first step)'] = [
    ["input#email", "zqqiang@fortinet.com", "input#username", "admin"],
    ["input[name='password']", "SuperCRM801", "input#secretkey"],
    ["input[type='submit']", undefined, "button#login_button"],
    ["div.img_link:contains('FGT60D4615007833')", undefined, "skip"],
    ["div.cat_link:contains('Management')", undefined, "skip"],
]

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

// todo: bug
cases['routing new'] = [
    ["div.gwt-HTML:contains('Routing')"],
    ["button[title='Create New']"],
    ["input.gwt-TextBox:eq(0)", "192.168.18.0"],
    ["input.gwt-TextBox:eq(1)", "255.255.255.0"],
    ["input.gwt-TextBox:eq(2)", "192.168.1.1"],
    ["input.gwt-TextBox:eq(3)", 11],
    ["textarea.gwt-TextArea", "test comments"],
    ["span:contains('Save')"],
]

// todo: comment bug
cases['dns edit use fortigurad'] = [
    ["div.gwt-HTML:contains('DNS'):eq(0)"],
    ["input[type='radio']:eq(0)"],
    ["input.gwt-TextBox:eq(2)", "test string"],
    ["span:contains('Save')"],
];

// todo: comment bug
cases['dns edit specify'] = [
    ["div.gwt-HTML:contains('DNS'):eq(0)"],
    ["input[type='radio']:eq(1)"],
    ["input.gwt-TextBox:eq(0)", "1.1.1.1"],
    ["input.gwt-TextBox:eq(1)", "2.2.2.2"],
    ["input.gwt-TextBox:eq(2)", "test string"],
    ["span:contains('Save')"],
]

cases['fortigurad edit, enable all checkbox'] = [
    ["div.gwt-HTML:contains('FortiGuard')"],
    ["input:checkbox:eq(0)", true],
    ["input:checkbox:eq(1)", true],
    ["input:checkbox:eq(2)", true],
    ["input:checkbox:eq(3)", true],
    ["input:checkbox:eq(4)", true],
    ["input:checkbox:eq(5)", true],
    ["span:contains('Save')"],
]

cases['deploy'] = [
    ["button[title='Deploy']"],
    ["span:contains('YES')"],
    ["button:contains('OK')"],
    ["span:contains('Close')"],
]

// delete cases['admin settings common'];
delete cases['routing new'];
delete cases['dns edit use fortigurad'];
delete cases['dns edit specify'];
delete cases['fortigurad edit, enable all checkbox'];
// delete cases['deploy'];
// delete cases[];


module.exports = cases;
