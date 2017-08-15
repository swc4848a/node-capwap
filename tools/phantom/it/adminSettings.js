let Testcase = require('../testcase.js');

let cloudMap = {
    'Admin Settings': "div.gwt-HTML:contains('Admin Settings')",
    'HTTP Port': "input.gwt-TextBox:eq(0)",
    'Redirect to HTTPS': "input:checkbox",
    'HTTPS Port': "input.gwt-TextBox:eq(1)",
    'Telnet Port': "input.gwt-TextBox:eq(2)",
    'SSH Port': "input.gwt-TextBox:eq(3)",
    'Idle Timeout': "input.gwt-TextBox:eq(4)",
    'Save': "span:contains('Save')",
}

let gateMap = {
    'Admin Settings': "a[ng-href='system/settings']",
    'HTTP Port': "input#admin-port",
    'Redirect to HTTPS': "input#redirect-check",
    'HTTPS Port': "input#admin-sport",
    'Telnet Port': "input#admin-telnet-port",
    'SSH Port': "input#admin-ssh-port",
    'Idle Timeout': "input#admintimeout",
}

new Testcase({
    name: 'admin settings edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Admin Settings')
        c.set('HTTP Port', 80)
        c.checked('Redirect to HTTPS')
        c.set('HTTPS Port', 443)
        c.set('Telnet Port', 23)
        c.set('SSH Port', 22)
        c.set('Idle Timeout', 480)
        c.click('Save')
    },
    verify: (g) => {
        g.click('Admin Settings')
        g.isSet('HTTP Port', 80)
        g.isChecked('Redirect to HTTPS')
        g.isSet('HTTPS Port', 443)
        g.isSet('Telnet Port', 23)
        g.isSet('SSH Port', 22)
        g.isSet('Idle Timeout', 480)
    }
})