'use strict';

let cases = {};

cases['admin settings common'] = [
    ["div.gwt-HTML:contains('Admin Settings')"],
    ["input.gwt-TextBox:eq(0)", 80],
    ["span.gwt-CheckBox>label"],
    ["input.gwt-TextBox:eq(1)", 443],
    ["input.gwt-TextBox:eq(2)", 23],
    ["input.gwt-TextBox:eq(3)", 22],
    ["input.gwt-TextBox:eq(4)", 480],
    ["span:contains('Save')"],
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

delete cases['admin settings common'];
delete cases['routing new'];
delete cases['dns edit use fortigurad'];
delete cases['dns edit specify'];
// delete cases[];

module.exports = cases;
