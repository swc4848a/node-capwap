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

new Testcase({
    name: 'authentication settings edit',
    testcase() {
        this.click(cloudMap['Authentication Settings'])
        this.set(cloudMap['Authentication Timeout'], 11)
        this.check(cloudMap['Protocol Support All'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['User & Device'])
        this.click(gateMap['Authentication Settings'])
        this.wait(1000)
        this.isSet(gateMap['Authentication Timeout'])
        this.isCheck(gateMap['HTTP'])
        this.isCheck(gateMap['HTTPS'])
        this.isCheck(gateMap['FTP'])
        this.isCheck(gateMap['TELNET'])
        this.isCheck(gateMap['Redirect HTTP Challenge to a Secure Channel (HTTPS)'])
    }
})