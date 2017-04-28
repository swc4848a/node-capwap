let Testcase = require('../testcase.js');

let map = {
    'Admin Settings': "div.gwt-HTML:contains('Admin Settings')",
    'HTTP Port': "input.gwt-TextBox:eq(0)",
    'Redirect to HTTPS': "input:checkbox",
    'HTTPS Port': "input.gwt-TextBox:eq(1)",
    'Telnet Port': "input.gwt-TextBox:eq(2)",
    'SSH Port': "input.gwt-TextBox:eq(3)",
    'Idle Timeout': "input.gwt-TextBox:eq(4)",
    'Save': "span:contains('Save')",
}

new Testcase('admin settings edit', map, (t) => {
    t.click('Admin Settings')
    t.set('HTTP Port', 80)
    t.checked('Redirect to HTTPS')
    t.set('HTTPS Port', 443)
    t.set('Telnet Port', 23)
    t.set('SSH Port', 22)
    t.set('Idle Timeout', 480)
    t.click('Save')
})

// cases['admin settings common'] = [
//     ["div.gwt-HTML:contains('Admin Settings')", undefined, "a[ng-href='admin/settings']"],
//     ["input.gwt-TextBox:eq(0)", 80, "input#admin-port"],
//     ["input:checkbox", true, "input#redirect-check"],
//     ["input.gwt-TextBox:eq(1)", 443, "input#admin-sport"],
//     ["input.gwt-TextBox:eq(2)", 23, "input#admin-telnet-port"],
//     ["input.gwt-TextBox:eq(3)", 22, "input#admin-ssh-port"],
//     ["input.gwt-TextBox:eq(4)", 480, "input#admintimeout"],
//     ["span:contains('Save')", undefined, "skip"],
// ];
