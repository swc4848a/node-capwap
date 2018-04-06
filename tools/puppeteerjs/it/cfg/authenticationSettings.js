let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'User & Device': "//div[text()='User & Device']",
    'Authentication Settings': "div.gwt-HTML:contains('Authentication Settings')",
    'Authentication Timeout': "input.gwt-TextBox:eq(0)",
    'Protocol Support All': "input:checkbox",
    'Save': "span:contains('Save')",
    'All Checkbox': "input:checkbox",
}

let gateMap = {
    'User & Device': "//span[text()='User & Device']",
    'Authentication Settings': "a[ng-href='page/p/user/auth/settings/']",
    'Authentication Timeout': "input#auth_timeout",
    'HTTP': "input:checkbox#chk_http",
    'HTTPS': "input:checkbox#chk_https",
    'FTP': "input:checkbox#chk_ftp",
    'TELNET': "input:checkbox#chk_telnet",
    'Redirect HTTP Challenge to a Secure Channel (HTTPS)': "input:checkbox#chk_secure",
    'Certificate': "",

    'checkbox all': "input:checkbox",
}
/*  Editor: userSettingsEditor
    Key/Id:
        i: "authTimeout",
        k: "authType-HTTP",
        i: "authSecureHttp",
        i: "authType-HTTPS",
        i: "authType-FTP",
        i: "authType-TELNET",
        k: "authCert".
*/
new Testcase({
    name: 'authentication settings edit',
    testcase() {
        this.click(cloudMap['Authentication Settings'])
        this.wait(1000)
        this.set('#fcld-userSettingsEditor-authTimeout', 11)
        this.evaluate(`FcldUiTest.setUiObjectValue("userSettingsEditor-authType-HTTP", "true")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userSettingsEditor-authCert", "Fortinet_Factory")`)
        this.check('#fcld-userSettingsEditor-authSecureHttp > input')
        this.check('#fcld-userSettingsEditor-authType-HTTPS > input')
        this.check('#fcld-userSettingsEditor-authType-FTP > input')
        this.check('#fcld-userSettingsEditor-authType-TELNET > input')
        this.wait(1000)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['User & Device'])
        this.click(gateMap['Authentication Settings'])
        this.wait(4000)
        this.isSet(gateMap['Authentication Timeout'], 11)
        this.isCheck(gateMap['HTTP'])
        this.isCheck(gateMap['HTTPS'])
        this.isCheck(gateMap['FTP'])
        this.isCheck(gateMap['TELNET'])
        this.isCheck(gateMap['Redirect HTTP Challenge to a Secure Channel (HTTPS)'])
        this.has('Fortinet_Factory');
    }
})

new Testcase({
    name: 'authentication settings clean',
    testcase() {
        this.click(cloudMap['Authentication Settings'])
        this.wait(1000)
        this.set('#fcld-userSettingsEditor-authTimeout', 12)
        this.evaluate(`FcldUiTest.setUiObjectValue("userSettingsEditor-authType-HTTP", "false")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userSettingsEditor-authCert", "Fortinet_Factory")`)
        this.uncheck('#fcld-userSettingsEditor-authType-HTTPS > input')
        this.uncheck('#fcld-userSettingsEditor-authType-FTP > input')
        this.uncheck('#fcld-userSettingsEditor-authType-TELNET > input')
        this.wait(1000)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['User & Device'])
        this.click(gateMap['Authentication Settings'])
        this.wait(4000)
        this.isSet(gateMap['Authentication Timeout'], 12)
        this.isUncheck(gateMap['HTTP'])
        this.isUncheck(gateMap['HTTPS'])
        this.isUncheck(gateMap['FTP'])
        this.isUncheck(gateMap['TELNET'])
        this.has('Fortinet_Factory')
    }
})