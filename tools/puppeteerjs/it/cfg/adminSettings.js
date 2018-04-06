let Testcase = require('../../src/testcase.js');

let httpPort = 80;
let httpsPort = 443;
let tlenetPort = 23;
let sshPort = 22;
let idleTimeout = 480;

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
/*
    Editor: "adminSettingsEditor"
    Key/Id:
        k: "timezone",
        i: "ntpsync",
        k: "ntpsync",
        k: "type",
        i: "syncinterval,
        i: "server",
        i: "adminPort",
        i: "adminHttpsRedirect",
        i: "adminSport",
        i: "adminTelnetPort",
        i: "adminSshPort",
        i: "admintimeout".
*/
new Testcase({
    name: 'admin settings edit',
    testcase() {
        this.wait(2000)
        this.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-timezone", "(GMT-4:30)Caracas")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-ntpsync", false)`)
        this.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-type", "Specify")`)
        this.set('#fcld-adminSettingsEditor-syncinterval', 60)
        this.set('#fcld-adminSettingsEditor-server', 'test.com')
        this.set('#fcld-adminSettingsEditor-adminPort', httpPort)
        this.check('#fcld-adminSettingsEditor-adminHttpsRedirect > input')
        this.set('#fcld-adminSettingsEditor-adminSport', httpsPort)
        this.set('#fcld-adminSettingsEditor-adminTelnetPort', tlenetPort)
        this.set('#fcld-adminSettingsEditor-adminSshPort', sshPort)
        this.set('#fcld-adminSettingsEditor-admintimeout', idleTimeout)
        this.capture('debugAdminSettings.png')
        this.click(cloudMap['Save'])
        this.wait(2000)
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Admin Settings'])
        this.wait(2000)
        this.isSet(gateMap['HTTP Port'], httpPort)
        this.isCheck(gateMap['Redirect to HTTPS'])
        this.isSet(gateMap['HTTPS Port'], httpsPort)
        this.isSet(gateMap['Telnet Port'], tlenetPort)
        this.isSet(gateMap['SSH Port'],sshPort)
        this.isSet(gateMap['Idle Timeout'], idleTimeout)
    }
})

new Testcase({
    name: 'admin settings edit other',
    testcase() {
        this.wait(2000)
        this.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-timezone", "(GMT-4:30)Caracas")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-ntpsync", false)`)
        this.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-type", "Specify")`)
        this.set('#fcld-adminSettingsEditor-syncinterval', 61)
        this.set('#fcld-adminSettingsEditor-server', 'test.com')
        this.set('#fcld-adminSettingsEditor-adminPort', httpPort)
        this.uncheck('#fcld-adminSettingsEditor-adminHttpsRedirect > input')
        this.set('#fcld-adminSettingsEditor-adminSport', httpsPort)
        this.set('#fcld-adminSettingsEditor-adminTelnetPort', tlenetPort)
        this.set('#fcld-adminSettingsEditor-adminSshPort', sshPort)
        this.set('#fcld-adminSettingsEditor-admintimeout', idleTimeout)
        this.capture('debugAdminSettings.png')
        this.click(cloudMap['Save'])
        this.wait(2000)
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Admin Settings'])
        this.wait(2000)
        this.isSet(gateMap['HTTP Port'], httpPort)
        this.isUncheck(gateMap['Redirect to HTTPS'])
        this.isSet(gateMap['HTTPS Port'], httpsPort)
        this.isSet(gateMap['Telnet Port'], tlenetPort)
        this.isSet(gateMap['SSH Port'],sshPort)
        this.isSet(gateMap['Idle Timeout'], idleTimeout)
    }
})