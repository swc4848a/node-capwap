let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'Admin Settings': "div.gwt-HTML:contains('Settings'):eq(0)",
    'HTTP Port': "input.gwt-TextBox:eq(1)",
    'Redirect to HTTPS': "input:checkbox",
    'HTTPS Port': "input.gwt-TextBox:eq(2)",
    'Telnet Port': "input.gwt-TextBox:eq(3)",
    'SSH Port': "input.gwt-TextBox:eq(4)",
    'Idle Timeout': "input.gwt-TextBox:eq(5)",
    'Save': "span:contains('Save')",
}

let gateMap = {
    'System': "//span[text()='System']",
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
    testcase() {
        this.click(cloudMap['Admin Settings'])
        this.wait(2000)
        this.set(cloudMap['HTTP Port'], 80)
        this.uncheck(cloudMap['Redirect to HTTPS'])
        this.set(cloudMap['HTTPS Port'], 443)
        this.set(cloudMap['Telnet Port'], 23)
        this.set(cloudMap['SSH Port'], 22)
        this.set(cloudMap['Idle Timeout'], 480)
        this.click(cloudMap['Save'])
        this.wait(2000)
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Admin Settings'])
        this.wait(2000)
        this.isSet(gateMap['HTTP Port'], 80)
        this.isUncheck(gateMap['Redirect to HTTPS'])
        this.isSet(gateMap['HTTPS Port'], 443)
        this.isSet(gateMap['Telnet Port'], 23)
        this.isSet(gateMap['SSH Port'], 22)
        this.isSet(gateMap['Idle Timeout'], 480)
    }
})