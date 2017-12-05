let Testcase = require('../testcase.js');

let cloudMap = {
    'Authentication Settings': "div.gwt-HTML:contains('Authentication Settings')",

    'Authentication Timeout': "input.gwt-TextBox",
    'Protocol Support All': "input:checkbox",

    'Save': "span:contains('Save')",

    'All Checkbox': "input:checkbox",
}

let gateMap = {
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
    name: 'template: authentication settings edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Authentication Settings')

        c.set('Authentication Timeout', 11)
        c.checked('Protocol Support All')

        c.click('Save')
    },
    verify: (g) => {
        g.click('Authentication Settings')
        g.isSet('Authentication Timeout')
        g.isChecked('HTTP')
        g.isChecked('HTTPS')
        g.isChecked('FTP')
        g.isChecked('TELNET')
        g.isChecked('Redirect HTTP Challenge to a Secure Channel (HTTPS)')
    }
})